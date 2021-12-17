package com.example.graservice.resources;

import com.example.graservice.dtos.EmployeeDTO;
import com.example.graservice.services.EmpolyeesService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@RequestScoped
@Path("/employees")
public class EmployeesResource {

    @Inject
    private EmpolyeesService empolyeesService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployees() {
        return Response
                .ok(empolyeesService.getAllEmployees())
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getEmployeeById(@PathParam("id") int id) {
        EmployeeDTO employee = empolyeesService.getEmployeeById(id);
        if(employee != null) {
            return Response
                    .ok(employee)
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @RolesAllowed("ADMIN")
    @DELETE
    @Path("/{id}")
    public Response removeEmployeeById(@PathParam("id") int id) {
        if(empolyeesService.removeEmployeeById(id)) {
            return Response
                    .noContent()
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @RolesAllowed("ADMIN")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployee(JsonObject employee) {
        String errorMessage = empolyeesService.validatePostRequest(employee);
        if (errorMessage.isEmpty())
            return Response
                    .status(Response.Status.CREATED)
                    .entity(empolyeesService.addEmployee(employee))
                    .build();
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(errorMessage)
                .build();
    }

    @RolesAllowed("ADMIN")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editEmployee(@PathParam("id") int id, EmployeeDTO editedEmployee) {
        EmployeeDTO employee = empolyeesService.getEmployeeById(id);
        if(employee != null) {
            return Response
                    .ok(empolyeesService.editEmployee(id, editedEmployee))
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }
}
