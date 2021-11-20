package com.example.graservice.resources;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.entities.CustomersEntity;
import com.example.graservice.services.CustomersService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

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
                .header("Access-Control-Allow-Origin", "*")
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
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response removeCustomerById(@PathParam("id") int id) {
        if(customersService.removeCustomerById(id)) {
            return Response
                    .noContent()
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCustomer(CustomersEntity customer) {
        return Response
                .status(201)
                .entity(customersService.addCustomer(customer))
                .header("Access-Control-Allow-Origin", "*")
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
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        }
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

}
