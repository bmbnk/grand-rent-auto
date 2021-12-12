package com.example.graservice.services;

import com.example.graservice.entities.IUser;
import com.example.graservice.enums.UserType;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.RandomStringUtils;

import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class AuthenticationService {
    public IUser validateCredentials(String email, String password, UserType userType) {
        return null;
    }

    public String createToken(int id, String userName, String geteMail, String password, Boolean isAdmin) {
        return null;
    }

    public Map<String, String> hashPassword(String password) {
        Map<String, String> passwordComponents = new HashMap<>();
        String salt = RandomStringUtils.randomAlphabetic(64);;
        passwordComponents.put("salt", salt);
        String hash = DigestUtils.sha256Hex(password.concat(salt));
        passwordComponents.put("hash", hash);
        return passwordComponents;
    }

}
