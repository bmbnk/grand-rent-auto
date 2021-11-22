package com.example.graservice.services;

import com.example.graservice.entities.CustomersEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional
public class CustomersService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<CustomersEntity> getAllCustomers() {
        return entityManager.createQuery("SELECT c FROM CustomersEntity c").getResultList();
    }

    public CustomersEntity getCustomerById(int id) {
        return entityManager.find(CustomersEntity.class, id);
    }

    public boolean removeCustomerById(int id) {
        CustomersEntity customer = getCustomerById(id);
        if(customer != null) {
            entityManager.remove(customer);
            return true;
        }
        return false;
    }

    public CustomersEntity addCustomer(CustomersEntity customer) {
        entityManager.persist(customer);
        return customer;
    }

    public CustomersEntity editCustomer(CustomersEntity customer, CustomersEntity editedCustomer) {
        entityManager.detach(customer);
        copyCustomerFields(customer, editedCustomer);
        entityManager.merge(customer);
        return customer;
    }

    private void copyCustomerFields(CustomersEntity targetCustomer, CustomersEntity customer) {
        targetCustomer.setFirstName(customer.getFirstName());
        targetCustomer.setLastName(customer.getLastName());
        targetCustomer.seteMail(customer.geteMail());
        targetCustomer.setPhoneNumber(customer.getPhoneNumber());
    }
}
