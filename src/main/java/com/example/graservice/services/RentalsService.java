package com.example.graservice.services;

import com.example.graservice.entities.CarsEntity;
import com.example.graservice.entities.CustomersEntity;
import com.example.graservice.entities.EmployeesEntity;
import com.example.graservice.entities.RentalsEntity;
import com.example.graservice.entities.enums.CarStatus;
import com.example.graservice.utils.Formatters;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.time.LocalDate;

@ApplicationScoped
@Transactional
public class RentalsService {

    @PersistenceContext
    private EntityManager entityManager;

    public String validatePostRequest(JsonObject rentalData) {
        String errorMessage = "";

        int carId = rentalData.getInt("carId");
        CarsEntity car = entityManager.find(CarsEntity.class, carId);
        if (car.getStatus() != CarStatus.available)
            errorMessage = errorMessage.concat("The car is not available. ");

        int employeeId = rentalData.getInt("employeeId");
        int foundEmployeesCount = entityManager
                .createQuery("select e.employeesId from EmployeesEntity e where e.employeesId = " + String.valueOf(employeeId))
                .getResultList()
                .size();
        if (foundEmployeesCount == 0)
            errorMessage = errorMessage.concat("There is no emplooyee with id = " + String.valueOf(employeeId) + ". ");

        int customerId = rentalData.getInt("customerId");
        int foundCoustomersCount = entityManager
                .createQuery("select c.customerId from CustomersEntity c where c.customerId = " + String.valueOf(customerId))
                .getResultList()
                .size();
        if (foundCoustomersCount == 0)
            errorMessage = errorMessage.concat("There is no customer with id = " + String.valueOf(customerId) + ". ");

        LocalDate startDate = Formatters.getDate(rentalData.getString("startDate"));
        LocalDate endDate = Formatters.getDate(rentalData.getString("endDate"));
        if (startDate.isAfter(endDate) || startDate.equals(endDate))
            errorMessage = errorMessage.concat("The start date should precede the end date. ");

        return errorMessage;
    }

    public RentalsEntity addRental(JsonObject rentalData) {
        int carId = rentalData.getInt("carId");
        int employeeId = rentalData.getInt("employeeId");
        int customerId = rentalData.getInt("customerId");
        CarsEntity car = entityManager.find(CarsEntity.class, carId);
        EmployeesEntity employee = entityManager.getReference(EmployeesEntity.class, employeeId);
        CustomersEntity customer = entityManager.getReference(CustomersEntity.class, customerId);

        RentalsEntity rental = new RentalsEntity();
        rental.setStartDate(Formatters.getDate(rentalData.getString("startDate")));
        rental.setEndDate(Formatters.getDate(rentalData.getString("endDate")));
        rental.setCar(car);
        rental.setCustomer(customer);
        rental.setEmployee(employee);

        car.setStatus(CarStatus.rented);

        entityManager.persist(rental);

        return rental;
    }
}
