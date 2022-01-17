package com.example.graservice.dtos;

import jakarta.json.bind.annotation.JsonbProperty;


// Class used to present employee to the api user
public class EmployeeDTO {
    private int employeesId;
    private String firstName;
    private String lastName;
    private String eMail;
    private Integer phoneNumber;
    private boolean isAdmin;

    public EmployeeDTO() {}

    public EmployeeDTO(int employeesId, String firstName, String lastName, String eMail, Integer phoneNumber, boolean isAdmin) {
        this.employeesId = employeesId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
    }

    public int getEmployeesId() {
        return employeesId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String geteMail() {
        return eMail;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    @JsonbProperty("isAdmin")
    public boolean isAdmin() {
        return isAdmin;
    }

    public void setEmployeesId(int employeesId) {
        this.employeesId = employeesId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonbProperty("isAdmin")
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
