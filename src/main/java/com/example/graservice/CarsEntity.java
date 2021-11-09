package com.example.graservice;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "cars", schema = "gra", catalog = "")
public class CarsEntity {
    private int carId;
    private Object clazz;
    private String brand;
    private String model;
    private Integer seatingCapacity;
    private Double engineCapacity;
    private Object engineType;
    private Integer mileage;
    private Byte availability;
    private byte[] pictures;

    @Id
    @Column(name = "car_id")
    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    @Basic
    @Column(name = "class")
    public Object getClazz() {
        return clazz;
    }

    public void setClazz(Object clazz) {
        this.clazz = clazz;
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
    @Column(name = "engine_type")
    public Object getEngineType() {
        return engineType;
    }

    public void setEngineType(Object engineType) {
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
    @Column(name = "pictures")
    public byte[] getPictures() {
        return pictures;
    }

    public void setPictures(byte[] pictures) {
        this.pictures = pictures;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CarsEntity that = (CarsEntity) o;

        if (carId != that.carId) return false;
        if (clazz != null ? !clazz.equals(that.clazz) : that.clazz != null) return false;
        if (brand != null ? !brand.equals(that.brand) : that.brand != null) return false;
        if (model != null ? !model.equals(that.model) : that.model != null) return false;
        if (seatingCapacity != null ? !seatingCapacity.equals(that.seatingCapacity) : that.seatingCapacity != null)
            return false;
        if (engineCapacity != null ? !engineCapacity.equals(that.engineCapacity) : that.engineCapacity != null)
            return false;
        if (engineType != null ? !engineType.equals(that.engineType) : that.engineType != null) return false;
        if (mileage != null ? !mileage.equals(that.mileage) : that.mileage != null) return false;
        if (availability != null ? !availability.equals(that.availability) : that.availability != null) return false;
        if (!Arrays.equals(pictures, that.pictures)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = carId;
        result = 31 * result + (clazz != null ? clazz.hashCode() : 0);
        result = 31 * result + (brand != null ? brand.hashCode() : 0);
        result = 31 * result + (model != null ? model.hashCode() : 0);
        result = 31 * result + (seatingCapacity != null ? seatingCapacity.hashCode() : 0);
        result = 31 * result + (engineCapacity != null ? engineCapacity.hashCode() : 0);
        result = 31 * result + (engineType != null ? engineType.hashCode() : 0);
        result = 31 * result + (mileage != null ? mileage.hashCode() : 0);
        result = 31 * result + (availability != null ? availability.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(pictures);
        return result;
    }
}
