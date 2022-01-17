package com.example.graservice.entities;

import jakarta.persistence.*;

// ORM Layer class representing the employees table entry
@Entity
@Table(name = "employees", schema = "gra", catalog = "")
public class EmployeesEntity implements IUser {
    private int employeesId;
    private String firstName;
    private String lastName;
    private String eMail;
    private Integer phoneNumber;
    private String hashPwd;
    private String saltPwd;
    private boolean isAdmin;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employees_id")
    public int getEmployeesId() {
        return employeesId;
    }

    public void setEmployeesId(int employeesId) {
        this.employeesId = employeesId;
    }

    @Basic
    @Column(name = "first_name")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "e_mail")
    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    @Basic
    @Column(name = "phone_number")
    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "hash_pwd")
    public String getHashPwd() {
        return hashPwd;
    }

    public void setHashPwd(String hashPwd) {
        this.hashPwd = hashPwd;
    }

    @Basic
    @Column(name = "salt_pwd")
    public String getSaltPwd() {
        return saltPwd;
    }

    public void setSaltPwd(String saltPwd) {
        this.saltPwd = saltPwd;
    }

    @Basic
    @Column(name = "is_admin", columnDefinition = "TINYINT(1)")
    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EmployeesEntity that = (EmployeesEntity) o;

        if (employeesId != that.employeesId) return false;
        if (firstName != null ? !firstName.equals(that.firstName) : that.firstName != null) return false;
        if (lastName != null ? !lastName.equals(that.lastName) : that.lastName != null) return false;
        if (eMail != null ? !eMail.equals(that.eMail) : that.eMail != null) return false;
        if (phoneNumber != null ? !phoneNumber.equals(that.phoneNumber) : that.phoneNumber != null) return false;
        if (hashPwd != null ? !hashPwd.equals(that.hashPwd) : that.hashPwd != null) return false;
        if (saltPwd != null ? !saltPwd.equals(that.saltPwd) : that.saltPwd != null) return false;
        if (isAdmin != that.isAdmin) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = employeesId;
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (eMail != null ? eMail.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (hashPwd != null ? hashPwd.hashCode() : 0);
        result = 31 * result + (saltPwd != null ? saltPwd.hashCode() : 0);

        return result;
    }

    @SuppressWarnings("JpaAttributeMemberSignatureInspection")
    public int getId() { return employeesId; }
}
