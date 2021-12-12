package com.example.graservice.services;

import com.example.graservice.dtos.EmployeeDTO;
import com.example.graservice.dtos.mappers.EmployeeMapper;
import com.example.graservice.entities.EmployeesEntity;
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
public class EmpolyeesService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private EmployeeMapper mapper;

    @Inject
    private AuthenticationService authenticationService;

    public List<EmployeeDTO> getAllEmployees() {
        List<EmployeesEntity> entities = entityManager.createQuery("SELECT e FROM EmployeesEntity e").getResultList();
        return entities
                .stream()
                .map(mapper::toDTO)
                .collect(toList());
    }

    public EmployeeDTO getEmployeeById(int id) {
        return mapper.toDTO(entityManager.find(EmployeesEntity.class, id));
    }

    public boolean removeEmployeeById(int id) {
        EmployeesEntity employee = entityManager.find(EmployeesEntity.class, id);
        if(employee != null) {
            entityManager.remove(employee);
            return true;
        }
        return false;
    }

    public EmployeeDTO addEmployee(JsonObject employeeData) {
        String eMail = employeeData.getString("eMail");
        String password = employeeData.getString("password");

        EmployeesEntity employee = new EmployeesEntity();

        employee.seteMail(eMail);
        Map<String, String> passwordComponents = authenticationService.hashPassword(password);
        employee.setHashPwd(passwordComponents.get("hash"));
        employee.setSaltPwd(passwordComponents.get("salt"));
        try {
            employee.setFirstName(employeeData.getString("firstName"));
        } catch (NullPointerException e) {};
        try {
            employee.setLastName(employeeData.getString("lastName"));
        } catch (NullPointerException e) {};
        try {
            employee.setPhoneNumber(employeeData.getInt("phoneNumber"));
        } catch (NullPointerException e) {};
        try {
            employee.setAdmin(employeeData.getBoolean("isAdmin"));
        } catch (NullPointerException e) {};

        entityManager.persist(employee);
        entityManager.flush();
        return mapper.toDTO(employee);
    }

    public EmployeeDTO editEmployee(int emplooyeesId, EmployeeDTO editedEmployee) {
        EmployeesEntity employee = entityManager.find(EmployeesEntity.class, emplooyeesId);
        if (employee != null) {
            entityManager.detach(employee);
            copyEmployeeDTOFields(employee, editedEmployee);
            entityManager.merge(employee);
            return mapper.toDTO(employee);
        }
        return null;
    }

    private void copyEmployeeDTOFields(EmployeesEntity targetEmployee, EmployeeDTO employee) {
        targetEmployee.setFirstName(employee.getFirstName());
        targetEmployee.setLastName(employee.getLastName());
        targetEmployee.seteMail(employee.geteMail());
        targetEmployee.setPhoneNumber(employee.getPhoneNumber());
        targetEmployee.setAdmin(employee.isAdmin());
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
