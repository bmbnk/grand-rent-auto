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
}
