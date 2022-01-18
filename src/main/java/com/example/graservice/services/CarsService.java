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

@ApplicationScoped
@Transactional
public class CarsService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<CarsEntity> getAllCars() {
        return entityManager.createQuery("SELECT c FROM CarsEntity c").getResultList();
    }

    public CarsEntity getCarById(int id) {
        return entityManager.find(CarsEntity.class, id);
    }

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

    public boolean removeCarById(int id) {
        CarsEntity car = getCarById(id);
        if (car != null) {
            entityManager.remove(car);
            return true;
        }
        return false;
    }

    public CarsEntity addCar(CarsEntity car) {
        entityManager.persist(car);
        return car;
    }

    public CarsEntity editCar(CarsEntity car, CarsEntity editedCar) {
        entityManager.detach(car);
        copyCarFields(car, editedCar);
        entityManager.merge(car);
        return car;
    }

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
