package com.example.graservice.dtos.mappers;

import com.example.graservice.dtos.CustomerDTO;
import com.example.graservice.entities.CustomersEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CustomerMapper {
    public CustomerDTO toDTO(CustomersEntity customer) {
        if (customer == null)
            return null;
        return new CustomerDTO(
                customer.getCustomerId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.geteMail(),
                customer.getPhoneNumber());
    }
}
