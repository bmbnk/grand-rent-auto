package com.example.graservice.resources;


import com.example.graservice.entities.EmployeesEntity;
import com.example.graservice.services.AuthenticationService;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@RequestScoped
@Path("/auth")
public class AuthenticationResource {

    @Inject
    private AuthenticationService authenticationService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response authenticate(JsonObject credentials) {
        EmployeesEntity user = authenticationService.validateCredentials(credentials.getString("email"), credentials.getString("password"));
        if (user != null) {
            String userName = user.getFirstName().concat(" ".concat(user.getLastName()));
            String token = authenticationService.createToken(user.getId(), userName, user.isAdmin());
            JsonObject jsonToken =  Json.createObjectBuilder()
                    .add("jwt", token)
                    .build();
            return Response.ok(jsonToken).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}