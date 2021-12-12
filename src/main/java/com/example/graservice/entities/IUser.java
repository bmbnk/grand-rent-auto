package com.example.graservice.entities;

import jakarta.persistence.*;

public interface IUser {
    int getId();
    @Basic
    @Column(name = "first_name")
    String getFirstName();
    void setFirstName(String firstName);
    @Basic
    @Column(name = "last_name")
    String getLastName();
    void setLastName(String lastName);
    @Basic
    @Column(name = "e_mail")
    String geteMail();
    void seteMail(String eMail);
}
