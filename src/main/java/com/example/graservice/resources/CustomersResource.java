package com.example.graservice.resources;

import com.example.graservice.dtos.CustomerDTO;
import com.example.graservice.services.CustomersService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/customers")
@RequestScoped
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getCustomerById(@PathParam("id") int id) {
        CustomerDTO customer = customersService.getCustomerById(id);
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCustomer(JsonObject customer) {
        String errorMessage = customersService.validatePostRequest(customer);
        if (errorMessage.isEmpty())
            return Response
                    .status(Response.Status.CREATED)
                    .entity(customersService.addCustomer(customer))
                    .build();
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(errorMessage)
                .build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editCustomer(@PathParam("id") int id, CustomerDTO editedCustomer) {
        CustomerDTO customer = customersService.editCustomer(id, editedCustomer);
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

}
