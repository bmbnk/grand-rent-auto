package com.example.graservice.resources;

import com.example.graservice.services.RentalsService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


// Class with REST API endpoint for adding new rental entry to the table Rentals
// int the application's database
@RequestScoped
@Path("/rentals")
public class RentalsResource {

    @Inject
    private RentalsService rentalsService;

    // Method creates new rental based on data sent in json object
    // and adds it to the Rentals table
    // in the application's database
    // in response to the POST request on the "/rentals" endpoint
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