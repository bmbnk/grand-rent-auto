package com.example.graservice.resources;

import com.example.graservice.entities.EmployeesEntity;
import com.example.graservice.services.EmpolyeesService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/employees")
@RequestScoped
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
        EmployeesEntity employee = empolyeesService.getEmployeeById(id);
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployee(EmployeesEntity employee) {
        return Response
                .status(201)
                .entity(empolyeesService.addEmployee(employee))
                .build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editEmployee(@PathParam("id") int id, EmployeesEntity editedEmployee) {
        EmployeesEntity employee = empolyeesService.getEmployeeById(id);
        if(employee != null) {
            return Response
                    .ok(empolyeesService.editEmployee(employee, editedEmployee))
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }
}
