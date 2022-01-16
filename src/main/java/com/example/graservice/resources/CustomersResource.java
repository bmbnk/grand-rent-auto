package com.example.graservice.resources;

import com.example.graservice.entities.CustomersEntity;
import com.example.graservice.services.CustomersService;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@RequestScoped
@PermitAll
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
    public Response addCustomer(CustomersEntity customer) {
        return Response
                .status(201)
                .entity(customersService.addCustomer(customer))
                .build();
    }

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
