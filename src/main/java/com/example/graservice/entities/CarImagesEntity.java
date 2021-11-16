package com.example.graservice.entities;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "car_images", schema = "gra", catalog = "")
public class CarImagesEntity {
    private int carImageId;
    private byte[] carImage;

    @Id
    @Column(name = "car_image_id")
    public int getCarImageId() {
        return carImageId;
    }

    public void setCarImageId(int carImageId) {
        this.carImageId = carImageId;
    }

    @Basic
    @Column(name = "car_image")
    public byte[] getCarImage() {
        return carImage;
    }

    public void setCarImage(byte[] carImage) {
        this.carImage = carImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CarImagesEntity that = (CarImagesEntity) o;

        if (carImageId != that.carImageId) return false;
        if (!Arrays.equals(carImage, that.carImage)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = carImageId;
        result = 31 * result + Arrays.hashCode(carImage);
        return result;
    }
}
