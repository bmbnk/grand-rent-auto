package com.example.graservice.resources;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.services.CarsService;
import com.example.graservice.services.RentalsService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@RequestScoped
@Path("/cars")
public class CarsResource {

    @Inject
    private CarsService carsService;
    @Inject
    private RentalsService rentalsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCars() {
        return  Response
                .ok(carsService.getAllCars())
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getCarById(@PathParam("id") int id) {
        CarsEntity car = carsService.getCarById(id);
        if (car != null)
            return Response
                    .ok(car)
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @RolesAllowed("ADMIN")
    @DELETE
    @Path("/{id}")
    public Response removeCarById(@PathParam("id") int id) {
        if (carsService.removeCarById(id))
            return Response
                    .noContent()
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @RolesAllowed("ADMIN")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCar(CarsEntity car) {
        // TODO: Make endpoint for adding photos
        return Response
                .status(Response.Status.CREATED)
                .entity(carsService.addCar(car))
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/return")
    public Response returnCar(@PathParam("id") int carId, JsonObject carUpdateData) {
        Integer rentId = carsService.getCarsRentalId(carId);
        if (rentId != null) {
            String errorMessage = carsService.validateReturnedCarUpdateData(carUpdateData);
            if (errorMessage.isEmpty()) {
                rentalsService.archiveRentalById(rentId);
                return Response
                        .ok(carsService.updateReturnedCar(carId, carUpdateData))
                        .build();
            } else {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .entity(errorMessage)
                        .build();
            }
        }
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity("This car is not rented.")
                .build();
    }

    @RolesAllowed("ADMIN")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editCar(@PathParam("id") int id, CarsEntity editedCar) {
        CarsEntity car = carsService.getCarById(id);
        if (car != null)
            return Response
                    .ok(carsService.editCar(car, editedCar))
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }
}
