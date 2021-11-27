package com.example.graservice.resources;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.services.CarsService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/cars")
@RequestScoped
public class CarsResource {

    @Inject
    private CarsService carsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCars() {
        return  Response
                .ok(carsService.getAllCars())
                .header("Access-Control-Allow-Origin", "*")
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
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response removeCarById(@PathParam("id") int id) {
        if (carsService.removeCarById(id))
            return Response
                    .noContent()
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCar(CarsEntity car) {
        // TODO: Make endpoint for adding photos
        return Response
                .status(Response.Status.CREATED)
                .entity(carsService.addCar(car))
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editCar(@PathParam("id") int id, CarsEntity editedCar) {
        CarsEntity car = carsService.getCarById(id);
        if (car != null)
            return Response
                    .ok(carsService.editCar(car, editedCar))
                    .header("Access-Control-Allow-Origin", "*")
                    .build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .header("Access-Control-Allow-Origin", "*")
                .build();
    }
}
