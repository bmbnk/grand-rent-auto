package com.example.graservice.resources;

import com.example.graservice.entities.CustomersEntity;
import com.example.graservice.services.CustomersService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

// Class with REST API endpoints for making CRUD actions on the table Customers
// int the application's database
@RequestScoped
@Path("/customers")
public class CustomersResource {

    @Inject
    private CustomersService customersService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomers() {
        return Response
                .ok(customersService.getAllCustomers())
                .build();
    }

    // Method returns customer with specified id if exists from the Customers table
    // in the application's database
    // in response to the GET request on the "/customers/{id}" endpoint
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getCustomerById(@PathParam("id") int id) {
        CustomersEntity customer = customersService.getCustomerById(id);
        if(customer != null) {
            return Response
                    .ok(customer)
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    // Method removes customer with specified id if exists from the Customers table
    // in the application's database
    // in response to the DELETE request on the "/customers/{id}" endpoint
    @DELETE
    @Path("/{id}")
    public Response removeCustomerById(@PathParam("id") int id) {
        if(customersService.removeCustomerById(id)) {
            return Response
                    .noContent()
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    // Method adds customer to the Customers table
    // in the application's database
    // in response to the POST request on the "/customers" endpoint
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCustomer(CustomersEntity customer) {
        return Response
                .status(201)
                .entity(customersService.addCustomer(customer))
                .build();
    }

    // Method updates the customer with specified id if exists
    // with the data sent in json object
    // and saves it in the Customers table
    // in the application's database
    // in response to the PUT request on the "/customers/{id}" endpoint
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editCustomer(@PathParam("id") int id, CustomersEntity editedCustomer) {
        CustomersEntity customer = customersService.getCustomerById(id);
        if(customer != null) {
            return Response
                    .ok(customersService.editCustomer(customer, editedCustomer))
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

}
