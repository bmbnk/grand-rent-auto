package com.example.graservice.tests;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.json.simple.JSONObject;
import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.equalTo;

public class CustomersTests {

    int id;

    @Test
    void a_testPOST() {
        JSONObject request = new JSONObject();
        request.put("eMail", "testPOST@test.pl");
        request.put("firstName", "testPOSTFirstName");
        request.put("lastName", "testLastPOSTName");
        request.put("phoneNumber", "555555555");
        request.put("customerId", 10);

        id = given()
                .header("Content-Type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(request.toJSONString())
        .when()
                .post("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/")
        .then()
                .statusCode(201)
        .extract().path("customerId");

        System.out.println("id = " + id);

    }

    @Test
    void b_testPUT() {

        JSONObject request = new JSONObject();
        request.put("eMail", "test@test.pl");
        request.put("firstName", "testFirstName");
        request.put("lastName", "testLastName");
        request.put("phoneNumber", "666666666");

        given()
                .header("Content-Type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/" + id)
                .then()
                .statusCode(200);
    }

    @Test
    void c_testGET() {
        given()
                .get("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/" + id)
                .then()
                .statusCode(200)
                .contentType("application/json")
                .body("customerId", equalTo(id))
                .body("firstName", equalTo("testFirstName"))
                .body("lastName", equalTo("testLastName"))
                .body("eMail", equalTo("test@test.pl"));
    }

    @Test
    void d_testDELETE() {
        when()
                .delete("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/customers/" + id)
        .then()
                .statusCode(204);
    }
}
