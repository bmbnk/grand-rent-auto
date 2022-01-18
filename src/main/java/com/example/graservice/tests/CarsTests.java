package com.example.graservice.tests;

import com.example.graservice.enums.CarClass;
import com.example.graservice.enums.CarStatus;
import com.example.graservice.enums.EngineType;
import io.restassured.http.ContentType;
import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.*;

public class CarsTests {
    int id;

    @Test
    void test_01_POST() {
        JSONObject request = new JSONObject();
        request.put("brand", "Fiat");
        request.put("model", "126p");
        request.put("seatingCapacity", "4");
        request.put("engineCapacity", "0.7");
        request.put("carClass", "economic");
        request.put("engineType", "petrol");
        request.put("pricePerDay", "50");

        id = given()
                .header("Content-Type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .post("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars/")
                .then()
                .statusCode(201)
                .extract().path("carId");

        System.out.println("id = " + id);

    }

    @Test
    void test_02_PUT() {
        JSONObject request = new JSONObject();
        request.put("brand", "Fiat");
        request.put("model", "126p");
        request.put("seatingCapacity", "4");
        request.put("engineCapacity", "0.8");
        request.put("mileage", "1700");
        request.put("status", "available");
        request.put("carClass", "economic");
        request.put("engineType", "petrol");
        request.put("pricePerDay", "100");
        request.put("notes", "test notes");



        given()
                .header("Content-Type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(request.toJSONString())
                .when()
                .put("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars/" + id)
                .then()
                .statusCode(200);
    }

    @Test
    void test_03_GET() {
        given()
                .get("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars/" + id)
                .then()
                .statusCode(200)
                .contentType("application/json")
                .body("carId", equalTo(id))
                .body("brand", equalTo("Fiat"))
                .body("model", equalTo("126p"))
                .body("seatingCapacity", equalTo(4))
                .body("engineCapacity", equalTo(0.8f))
                .body("mileage", equalTo(1700))
                .body("status", equalTo("available"))
                .body("carClass", equalTo("economic"))
                .body("engineType", equalTo("petrol"))
                .body("pricePerDay", equalTo(100f))
                .body("notes", equalTo("test notes"));
    }

    @Test
    void test_04_DELETE() {
        when()
                .delete("http://localhost:8080/gra-service-1.0-SNAPSHOT/api/cars/" + id)
                .then()
                .statusCode(204);
    }
}
