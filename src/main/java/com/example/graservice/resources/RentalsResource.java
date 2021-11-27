package com.example.graservice.resources;

import com.example.graservice.services.RentalsService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/rentals")
@RequestScoped
public class RentalsResource {

    @Inject
    private RentalsService rentalsService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRental(JsonObject rental) {
        String errors = rentalsService.validatePostRequest(rental);
        if (errors.isEmpty())
            return Response
                    .status(Response.Status.CREATED)
                    .entity(rentalsService.addRental(rental))
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(errors)
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }
}