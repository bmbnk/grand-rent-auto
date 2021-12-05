package com.example.graservice.services;

import com.example.graservice.entities.EmployeesEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional
public class EmpolyeesService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<EmployeesEntity> getAllEmployees() {
        return entityManager.createQuery("SELECT c FROM EmployeesEntity c").getResultList();
    }

    public EmployeesEntity getEmployeeById(int id) {
        return entityManager.find(EmployeesEntity.class, id);
    }

    public boolean removeEmployeeById(int id) {
        EmployeesEntity employee = getEmployeeById(id);
        if(employee != null) {
            entityManager.remove(employee);
            return true;
        }
        return false;
    }

    public EmployeesEntity addEmployee(EmployeesEntity employee) {
        entityManager.persist(employee);
        return employee;
    }

    public EmployeesEntity editEmployee(EmployeesEntity employee, EmployeesEntity editedEmployee) {
        entityManager.detach(employee);
        copyEmployeeFields(employee, editedEmployee);
        entityManager.merge(employee);
        return employee;
    }

    private void copyEmployeeFields(EmployeesEntity targetEmployee, EmployeesEntity employee) {
        targetEmployee.setFirstName(employee.getFirstName());
        targetEmployee.setLastName(employee.getLastName());
        targetEmployee.setLogin(employee.getLogin());
        targetEmployee.setPassword(employee.getPassword());
        targetEmployee.seteMail(employee.geteMail());
        targetEmployee.setPhoneNumber(employee.getPhoneNumber());
        targetEmployee.setAdmin(employee.isAdmin());
    }
}
