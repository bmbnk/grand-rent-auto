package com.example.graservice.services;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.enums.CarStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

// Service responsible for making CRUD actions on the table Cars
// in the application's database
@ApplicationScoped
@Transactional
public class CarsService {

    @PersistenceContext
    private EntityManager entityManager;

    // method returns all cars from the Cars table in the database
    public List<CarsEntity> getAllCars() {
        return entityManager.createQuery("SELECT c FROM CarsEntity c").getResultList();
    }

    // method returns car with specified Id from the Cars table in the database
    public CarsEntity getCarById(int id) {
        return entityManager.find(CarsEntity.class, id);
    }

    // method returns car's rental id based on car Id from the Cars table in the database
    public Integer getCarsRentalId(int carId) {
        try {
            int rentalId = (int)entityManager
                .createQuery("select r.rentId from RentalsEntity r where not r.archived and  r.car.carId = " + String.valueOf(carId))
                .getSingleResult();
            return rentalId;
        } catch (NoResultException e){
            return null;
        }
    }

    // method removes the car with specified Id if exists from the Cars table in the database
    public boolean removeCarById(int id) {
        CarsEntity car = getCarById(id);
        if (car != null) {
            entityManager.remove(car);
            return true;
        }
        return false;
    }

    // method adds specified car to the Cars table in the database
    public CarsEntity addCar(CarsEntity car) {
        entityManager.persist(car);
        return car;
    }

    // method replaces specified car's fields with new ones from another car
    // and applies the changes in the database
    public CarsEntity editCar(CarsEntity car, CarsEntity editedCar) {
        entityManager.detach(car);
        copyCarFields(car, editedCar);
        entityManager.merge(car);
        return car;
    }

    // helper method used to copy fields values from one car entry to another
    private void copyCarFields(CarsEntity targetCar, CarsEntity car) {
        targetCar.setBrand(car.getBrand());
        targetCar.setModel(car.getModel());
        targetCar.setSeatingCapacity(car.getSeatingCapacity());
        targetCar.setEngineCapacity(car.getEngineCapacity());
        targetCar.setMileage(car.getMileage());
        targetCar.setStatus(car.getStatus());
        targetCar.setCarClass(car.getCarClass());
        targetCar.setEngineType(car.getEngineType());
        targetCar.setPricePerDay(car.getPricePerDay());
        targetCar.setNotes(car.getNotes());
    }

    // method updates returned car fields "mileage", "status" and "notes"
    // with the ones that are provided in json object
    public CarsEntity updateReturnedCar(int carId, JsonObject carUpdateData) {
        CarsEntity car = getCarById(carId);
        entityManager.detach(car);
        String notes = carUpdateData.getString("notes", "");
        if (!notes.isEmpty())
            car.setNotes(notes);
        car.setMileage(carUpdateData.getInt("mileage"));
        car.setStatus(CarStatus.valueOf(carUpdateData.getString("status")));
        entityManager.merge(car);
        return car;
    }

    // method checks if the json object data is valid for updating returned car
    public String validateReturnedCarUpdateData(JsonObject carUpdateData) {
        String errorMessage = "";

        int mileage = carUpdateData.getInt("mileage", -1);
        if (mileage < 0)
            errorMessage = errorMessage + "The mileage should be a number that is not less than zero. ";

        try {
            CarStatus carStatus = CarStatus.valueOf(carUpdateData.getString("status", ""));
            if (carStatus == CarStatus.rented)
                errorMessage = errorMessage + "The car status should be different than \"rented\". ";
        } catch (IllegalArgumentException e) {
            errorMessage = errorMessage + "Car status is not valid. ";
        }

        return errorMessage;
    }
}
