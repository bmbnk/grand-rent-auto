package com.example.graservice.tests;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class customersTests {

 @Test
    void testGET() {
        given()
                .get("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/")
        .then()
                .statusCode(200)
                .contentType("application/json")
                .body("customerId[0]", equalTo(1))
                .body("firstName[0]", equalTo("maciej"))
                .body("lastName[0]", equalTo("kęsicki"))
                .body("eMail[0]", equalTo("mac.kes@123.pl"));
    }
}
