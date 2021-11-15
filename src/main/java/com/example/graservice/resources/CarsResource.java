package com.example.graservice.resources;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.services.CarsService;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;

@Path("/cars")
@RequestScoped
public class CarsResource {

    @Inject
    private CarsService carsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CarsEntity> getAllCars() {
        return carsService.getAllCars();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getCarById(@PathParam("id") int id) {
        CarsEntity car = carsService.getCarById(id);
        if (car != null)
            return Response.ok(car).build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @DELETE
    @Path("/{id}")
    public Response removeCarById(@PathParam("id") int id) {
        if (carsService.removeCarById(id))
            return Response.noContent().build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCar(CarsEntity car) {
        // TODO: Make endpoint for adding photos
        return Response.status(201)
                .entity(carsService.addCar(car)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response editCar(@PathParam("id") int id, CarsEntity editedCar) {
        CarsEntity car = carsService.getCarById(id);
        if (car != null)
            return Response.ok(carsService.editCar(car, editedCar)).build();
        return Response
                .status(Response.Status.NOT_FOUND)
                .entity("")
                .build();
    }
}
