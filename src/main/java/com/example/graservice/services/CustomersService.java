package com.example.graservice.services;

import com.example.graservice.entities.CustomersEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

// Service responsible for making CRUD actions on the table Customers
// in the application's database
@ApplicationScoped
@Transactional
public class CustomersService {

    @PersistenceContext
    private EntityManager entityManager;

    // method returns all customers from the Customers table in the database
    public List<CustomersEntity> getAllCustomers() {
        return entityManager.createQuery("SELECT c FROM CustomersEntity c").getResultList();
    }

    // method returns customer with specified Id from the Customers table in the database
    public CustomersEntity getCustomerById(int id) {
        return entityManager.find(CustomersEntity.class, id);
    }

    // method removes the customer with specified Id if exists from the Customers table in the database
    public boolean removeCustomerById(int id) {
        CustomersEntity customer = getCustomerById(id);
        if(customer != null) {
            entityManager.remove(customer);
            return true;
        }
        return false;
    }

    // method adds specified customer to the Customers table in the database
    public CustomersEntity addCustomer(CustomersEntity customer) {
        entityManager.persist(customer);
        return customer;
    }

    // method replaces specified customer's fields with new ones from another customer
    // and applies the changes in the database
    public CustomersEntity editCustomer(CustomersEntity customer, CustomersEntity editedCustomer) {
        entityManager.detach(customer);
        copyCustomerFields(customer, editedCustomer);
        entityManager.merge(customer);
        return customer;
    }

    // helper method used to copy fields values from one customer entry to another
    private void copyCustomerFields(CustomersEntity targetCustomer, CustomersEntity customer) {
        targetCustomer.setFirstName(customer.getFirstName());
        targetCustomer.setLastName(customer.getLastName());
        targetCustomer.seteMail(customer.geteMail());
        targetCustomer.setPhoneNumber(customer.getPhoneNumber());
    }
}
