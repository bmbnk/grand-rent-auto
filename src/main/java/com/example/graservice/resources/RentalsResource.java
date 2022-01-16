package com.example.graservice.resources;

import com.example.graservice.services.RentalsService;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@RequestScoped
@PermitAll
@Path("/rentals")
public class RentalsResource {

    @Inject
    private RentalsService rentalsService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRental(JsonObject rental) {
        String errorMessage = rentalsService.validatePostRequest(rental);
        if (errorMessage.isEmpty())
            return Response
                    .status(Response.Status.CREATED)
                    .entity(rentalsService.addRental(rental))
                    .build();
        return Response
                .status(Response.Status.FORBIDDEN)
                .entity(errorMessage)
                .build();
    }
}