package com.example.graservice.services;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;

import javax.crypto.SecretKey;


// service is responsible for managing secret key and signature algorithm
@ApplicationScoped
public class SecretService {
    private SecretKey secretKey;
    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // method creates new secret key and saves it in the secretKey field
    public void refreshSecret() {
        secretKey = Keys.secretKeyFor(signatureAlgorithm);
    }

    @PostConstruct
    public void setup() {
        refreshSecret();
    }

    public SecretKey getSecret() { return secretKey; }

    public SignatureAlgorithm getSignatureAlgorithm() { return signatureAlgorithm; }
}
