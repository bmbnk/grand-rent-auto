package com.example.graservice.dtos.mappers;

import com.example.graservice.dtos.EmployeeDTO;
import com.example.graservice.entities.EmployeesEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EmployeeMapper {
    public EmployeeDTO toDTO(EmployeesEntity employee) {
        if (employee == null)
            return null;
        return new EmployeeDTO(
                employee.getEmployeesId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.geteMail(),
                employee.getPhoneNumber(),
                employee.isAdmin());
    }
}
