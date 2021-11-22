package com.example.graservice.services;

import com.example.graservice.entities.CarsEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
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
    }
}
