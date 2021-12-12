package com.example.graservice.services;

import com.example.graservice.dtos.CustomerDTO;
import com.example.graservice.dtos.mappers.CustomerMapper;
import com.example.graservice.entities.CustomersEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@ApplicationScoped
@Transactional
public class CustomersService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private CustomerMapper mapper;

    @Inject
    private AuthenticationService authenticationService;

    public List<CustomerDTO> getAllCustomers() {
        List<CustomersEntity> entities = entityManager.createQuery("SELECT c FROM CustomersEntity c").getResultList();
        return entities
                .stream()
                .map(mapper::toDTO)
                .collect(toList());
    }

    public CustomerDTO getCustomerById(int id) {
        return mapper.toDTO(entityManager.find(CustomersEntity.class, id));
    }

    public boolean removeCustomerById(int id) {
        CustomersEntity customer = entityManager.find(CustomersEntity.class, id);
        if (customer != null) {
            entityManager.remove(customer);
            return true;
        }
        return false;
    }

    public CustomerDTO addCustomer(JsonObject customerData) {
        String eMail = customerData.getString("eMail");
        String password = customerData.getString("password");

        CustomersEntity customer = new CustomersEntity();

        customer.seteMail(eMail);
        Map<String, String> passwordComponents = authenticationService.hashPassword(password);
        customer.setHashPwd(passwordComponents.get("hash"));
        customer.setSaltPwd(passwordComponents.get("salt"));
        try {
            customer.setFirstName(customerData.getString("firstName"));
        } catch (NullPointerException e) {};
        try {
            customer.setLastName(customerData.getString("lastName"));
        } catch (NullPointerException e) {};
        try {
            customer.setPhoneNumber(customerData.getInt("phoneNumber"));
        } catch (NullPointerException e) {};

        entityManager.persist(customer);
        entityManager.flush();
        return mapper.toDTO(customer);
    }

    public CustomerDTO editCustomer(int customerId, CustomerDTO editedCustomer) {
        CustomersEntity customer = entityManager.find(CustomersEntity.class, customerId);
        if (customer != null) {
            entityManager.detach(customer);
            copyCustomerDTOFields(customer, editedCustomer);
            entityManager.merge(customer);
            return mapper.toDTO(customer);
        }
        return null;
    }

    private void copyCustomerDTOFields(CustomersEntity targetCustomer, CustomerDTO customer) {
        targetCustomer.setFirstName(customer.getFirstName());
        targetCustomer.setLastName(customer.getLastName());
        targetCustomer.seteMail(customer.geteMail());
        targetCustomer.setPhoneNumber(customer.getPhoneNumber());
    }

    public String validatePostRequest(JsonObject customerData) {
        String errorMessage = "";

        try {
            String pwd = customerData.getString("password");
        } catch (NullPointerException exception) {
            errorMessage = errorMessage.concat("No password was included in the request. ");
        }

        try {
            String eMail = customerData.getString("eMail");
        } catch (NullPointerException exception) {
            errorMessage = errorMessage.concat("No e-mail address was included in the request. ");
        }

        return errorMessage;
    }
}
