package com.example.graservice.filters;


import com.example.graservice.services.SecretService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.Priority;
import jakarta.annotation.security.DenyAll;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    private SecretService secretService;

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Method resourceMethod = resourceInfo.getResourceMethod();
        Class resourceClass = resourceInfo.getResourceClass();

        Annotation permissionAnnotation = getPermissionAnnotationClass(resourceMethod, resourceClass);
        if (!(permissionAnnotation != null && permissionAnnotation.annotationType() == PermitAll.class)) {
            if (permissionAnnotation != null && permissionAnnotation.annotationType() == DenyAll.class) {
                requestContext
                        .abortWith(Response.status(Response.Status.UNAUTHORIZED)
                                .entity("Access is blocked for every user.")
                                .build());
            }

            String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String tokenString = authorizationHeader.substring(7);
                try {
                    Claims claims = Jwts.parserBuilder()
                            .setSigningKey(secretService.getSecret())
                            .build()
                            .parseClaimsJws(tokenString)
                            .getBody();

                    List roles;
                    if (permissionAnnotation != null
                            && permissionAnnotation.annotationType() == RolesAllowed.class) {
                        roles = Arrays.asList(((RolesAllowed) permissionAnnotation).value());
                        if (roles.contains("ADMIN")) {
                            Boolean isAdmin = claims.get("isAdmin", Boolean.class);
                            if(!isAdmin) {
                                requestContext
                                        .abortWith(Response.status(Response.Status.UNAUTHORIZED)
                                                .entity("Only admin user can access this resource.")
                                                .build());
                                }
                            }
                    }
                    return;
                } catch (SignatureException e) {
                    requestContext
                            .abortWith(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity("JWT token is not valid.")
                                    .build());
                    return;
                } catch (JwtException e) {
                    requestContext
                            .abortWith(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity("Some exception occurred while reading the token.")
                                    .build());
                    return;
                }
            }
            requestContext
                    .abortWith(Response.status(Response.Status.UNAUTHORIZED)
                            .entity("No JWT token in Authorization header was found.")
                            .build());
        }
    }

    private Annotation getPermissionAnnotationClass(Method resourceMethod,
                                                                  Class resourceClass) {
        List<Class> annotationClasses = Arrays.asList(DenyAll.class, RolesAllowed.class, PermitAll.class);

        List<Annotation> methodAnnotations = Arrays.asList(
                resourceMethod.getDeclaredAnnotations()
        );
        for (Class annotationClass : annotationClasses){
            Annotation annotation = getAnnotation(methodAnnotations, annotationClass);
            if (annotation != null)
                return annotation;
        }

        List<Annotation> classAnnotations = Arrays.asList(
                resourceClass.getDeclaredAnnotations()
        );
        for (Class annotationClass : annotationClasses){
            Annotation annotation = getAnnotation(classAnnotations, annotationClass);
            if (annotation != null)
                return annotation;
        }
        return null;
    }

    private Annotation getAnnotation(List<Annotation> annotations, Class annotationType) {
        List <Annotation> resultAnnotations = annotations.stream()
                .filter(annotation -> annotation.annotationType() == annotationType)
                .collect(Collectors.toList());

        if (resultAnnotations.size() > 0)
            return resultAnnotations.get(0);
        else
            return null;
    }
}
