package com.example.graservice.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

// ORM Layer class representing the rentals table entry
@Entity
@Table(name = "rentals", schema = "gra", catalog = "")
public class RentalsEntity {
    private int rentId;
    private boolean archived;
    private LocalDate startDate;
    private LocalDate endDate;
    private CarsEntity car;
    private EmployeesEntity employee;
    private CustomersEntity customer;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id")
    public int getRentId() {
        return rentId;
    }

    public void setRentId(int rentId) {
        this.rentId = rentId;
    }

    @Basic
    @Column(name = "archived", columnDefinition = "TINYINT(1)")
    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) { this.archived = archived; }

    @Basic
    @Column(name = "start_date")
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    @Basic
    @Column(name = "end_date")
    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RentalsEntity that = (RentalsEntity) o;

        if (rentId != that.rentId) return false;
        if (archived != that.archived) return false;
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
    public CarsEntity getCar() {
        return car;
    }

    public void setCar(CarsEntity car) {
        this.car = car;
    }

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employees_id")
    public EmployeesEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeesEntity employee) {
        this.employee = employee;
    }

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    public CustomersEntity getCustomer() { return customer; }

    public void setCustomer(CustomersEntity customer) {
        this.customer = customer;
    }
}
