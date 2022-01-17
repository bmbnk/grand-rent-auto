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

// Class with REST API endpoints for making CRUD actions on the table Employees
// int the application's database
@RequestScoped
@Path("/employees")
public class EmployeesResource {

    @Inject
    private EmpolyeesService empolyeesService;

    // Method returns all employees from the Employees table in the application's database
    // in response to the GET request on the "/employees" endpoint
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployees() {
        return Response
                .ok(empolyeesService.getAllEmployees())
                .build();
    }

    // Method returns employee with specified id if exists from the Employees table
    // in the application's database
    // in response to the GET request on the "/employees/{id}" endpoint
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

    // Method removes employee with specified id if exists from the Employees table
    // in the application's database
    // in response to the DELETE request on the "/employees/{id}" endpoint
    // if the request was sent with admin's jwt token
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

    // Method adds employee to the Employees table
    // in the application's database
    // in response to the POST request on the "/employees" endpoint
    // if the request was sent with admin's jwt token
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

    // Method updates the employee with specified id if exists
    // with the data sent in json object
    // and saves it in the Employees table
    // in the application's database
    // in response to the PUT request on the "/employees/{id}" endpoint
    // if the request was sent with admin's jwt token
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
