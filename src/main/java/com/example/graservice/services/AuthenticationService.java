package com.example.graservice.services;

import com.example.graservice.entities.EmployeesEntity;
import io.jsonwebtoken.Jwts;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.RandomStringUtils;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


// Service responsible for authentication actions
@ApplicationScoped
public class AuthenticationService {

    @PersistenceContext
    private EntityManager entityManager;

    @Inject
    private SecretService secretService;

    // method returns user based on the email and the password if exists
    // and password is correct for the provided email
    public EmployeesEntity validateCredentials(String email, String password) {
        EmployeesEntity employee = (EmployeesEntity)entityManager.createQuery("select e from EmployeesEntity e where e.eMail = \'" + email + "\'").getSingleResult();

        if (DigestUtils.sha256Hex(password.concat(employee.getSaltPwd())).equals(employee.getHashPwd()))
            return employee;
        return null;

    }

    // method creates jwt token
    public String createToken(int id, String userName, Boolean isAdmin) {
        return Jwts.builder()
                .setSubject(userName)
                .claim("id", id)
                .claim("isAdmin", isAdmin)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusHours(1).toInstant()))
                .signWith(secretService.getSecret())
                .compact();
    }

    // method creates hash and salt values for the given password
    public Map<String, String> hashPassword(String password) {
        Map<String, String> passwordComponents = new HashMap<>();
        String salt = RandomStringUtils.randomAlphabetic(64);;
        passwordComponents.put("salt", salt);
        String hash = DigestUtils.sha256Hex(password.concat(salt));
        passwordComponents.put("hash", hash);
        return passwordComponents;
    }

}
