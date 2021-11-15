package com.example.graservice.entities;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "rentals", schema = "gra", catalog = "")
public class RentalsEntity {
    private int rentId;
    private Date startDate;
    private Date endDate;
    private CarsEntity carsByCarId;
    private EmployeesEntity employeesByEmployeeId;
    private CustomersEntity customersByCustomerId;

    @Id
    @GeneratedValue
    @Column(name = "rent_id")
    public int getRentId() {
        return rentId;
    }

    public void setRentId(int rentId) {
        this.rentId = rentId;
    }

    @Basic
    @Column(name = "start_date")
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "end_date")
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RentalsEntity that = (RentalsEntity) o;

        if (rentId != that.rentId) return false;
        if (startDate != null ? !startDate.equals(that.startDate) : that.startDate != null) return false;
        if (endDate != null ? !endDate.equals(that.endDate) : that.endDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = rentId;
        result = 31 * result + (startDate != null ? startDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "car_id")
    public CarsEntity getCarsByCarId() {
        return carsByCarId;
    }

    public void setCarsByCarId(CarsEntity carsByCarId) {
        this.carsByCarId = carsByCarId;
    }

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employees_id")
    public EmployeesEntity getEmployeesByEmployeeId() {
        return employeesByEmployeeId;
    }

    public void setEmployeesByEmployeeId(EmployeesEntity employeesByEmployeeId) {
        this.employeesByEmployeeId = employeesByEmployeeId;
    }

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    public CustomersEntity getCustomersByCustomerId() {
        return customersByCustomerId;
    }

    public void setCustomersByCustomerId(CustomersEntity customersByCustomerId) {
        this.customersByCustomerId = customersByCustomerId;
    }
}
