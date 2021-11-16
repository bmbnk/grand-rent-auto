package com.example.graservice.entities;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "cars", schema = "gra", catalog = "")
public class CarsEntity {
    private int carId;
    private String brand;
    private String model;
    private Integer seatingCapacity;
    private Double engineCapacity;
    private Integer mileage;
    private Byte availability;
    private CarClass carClass;
    private EngineType engineType;
    private Float pricePerDay;


    private enum CarClass {
        p, e, f;
    }
    private enum EngineType {
        petrol, diesel, lpg, hybrid, electric
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "class")
    public CarClass getCarClass() {
        return carClass;
    }

    public void setCarClass(CarClass carClass) {
        this.carClass = carClass;
    }

    @Basic
    @Column(name = "brand")
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Basic
    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Basic
    @Column(name = "seating_capacity")
    public Integer getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(Integer seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    @Basic
    @Column(name = "engine_capacity")
    public Double getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(Double engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "engine_type")
    public EngineType getEngineType() {
        return engineType;
    }

    public void setEngineType(EngineType engineType) {
        this.engineType = engineType;
    }

    @Basic
    @Column(name = "mileage")
    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    @Basic
    @Column(name = "availability")
    public Byte getAvailability() {
        return availability;
    }

    public void setAvailability(Byte availability) {
        this.availability = availability;
    }

    @Basic
    @Column(name = "price_per_day")
    public Float getPricePerDay() { return pricePerDay; }

    public void setPricePerDay(Float pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CarsEntity that = (CarsEntity) o;

        if (carId != that.carId) return false;
        if (carClass != null ? !carClass.equals(that.carClass) : that.carClass != null) return false;
        if (brand != null ? !brand.equals(that.brand) : that.brand != null) return false;
        if (model != null ? !model.equals(that.model) : that.model != null) return false;
        if (seatingCapacity != null ? !seatingCapacity.equals(that.seatingCapacity) : that.seatingCapacity != null)
            return false;
        if (engineCapacity != null ? !engineCapacity.equals(that.engineCapacity) : that.engineCapacity != null)
            return false;
        if (engineType != null ? !engineType.equals(that.engineType) : that.engineType != null) return false;
        if (mileage != null ? !mileage.equals(that.mileage) : that.mileage != null) return false;
        if (availability != null ? !availability.equals(that.availability) : that.availability != null) return false;
        if (pricePerDay != null ? !pricePerDay.equals(that.pricePerDay) : that.pricePerDay != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = carId;
        result = 31 * result + (carClass != null ? carClass.hashCode() : 0);
        result = 31 * result + (brand != null ? brand.hashCode() : 0);
        result = 31 * result + (model != null ? model.hashCode() : 0);
        result = 31 * result + (seatingCapacity != null ? seatingCapacity.hashCode() : 0);
        result = 31 * result + (engineCapacity != null ? engineCapacity.hashCode() : 0);
        result = 31 * result + (engineType != null ? engineType.hashCode() : 0);
        result = 31 * result + (mileage != null ? mileage.hashCode() : 0);
        result = 31 * result + (availability != null ? availability.hashCode() : 0);
        result = 31 * result + (pricePerDay != null ? pricePerDay.hashCode() : 0);
        return result;
    }
}
