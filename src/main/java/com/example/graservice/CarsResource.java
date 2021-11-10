package com.example.graservice;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/cars")
public class CarsResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCars() {
        String data = "[\n" +
                "    {\n" +
                "        \"carId\": 1,\n" +
                "        \"carClass\": \"Premium\",\n" +
                "        \"brand\": \"Mercedes Benz\",\n" +
                "        \"model\": \"S63 AMG S-COUPE\",\n" +
                "        \"seatingCapacity\": \"5\",\n" +
                "        \"engineCapacity\": \"5.4\",\n" +
                "        \"engineType\": \"Petrol\",\n" +
                "        \"mileage\": \"230000\",\n" +
                "        \"price\": \"250\",\n" +
                "        \"status\": \"Available\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"carId\": 2,\n" +
                "        \"carClass\": \"Economic\",\n" +
                "        \"brand\": \"Fiat\",\n" +
                "        \"model\": \"Punto\",\n" +
                "        \"seatingCapacity\": \"5\",\n" +
                "        \"engineCapacity\": \"1.3\",\n" +
                "        \"engineType\": \"Petrol\",\n" +
                "        \"mileage\": \"99770\",\n" +
                "        \"price\": \"40\",\n" +
                "        \"status\": \"Retired\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"carId\": 3,\n" +
                "        \"carClass\": \"Family\",\n" +
                "        \"brand\": \"Seat\",\n" +
                "        \"model\": \"Alhambra\",\n" +
                "        \"seatingCapacity\": \"7\",\n" +
                "        \"engineCapacity\": \"1.9\",\n" +
                "        \"engineType\": \"Diesel\",\n" +
                "        \"mileage\": \"167108\",\n" +
                "        \"price\": \"80\",\n" +
                "        \"status\": \"Available\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"carId\": 4,\n" +
                "        \"carClass\": \"Premium\",\n" +
                "        \"brand\": \"Ferrari\",\n" +
                "        \"model\": \"Testarossa\",\n" +
                "        \"seatingCapacity\": \"2\",\n" +
                "        \"engineCapacity\": \"5.0\",\n" +
                "        \"engineType\": \"Petrol\",\n" +
                "        \"mileage\": \"38000\",\n" +
                "        \"price\": \"500\",\n" +
                "        \"status\": \"Rented\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"carId\": 5,\n" +
                "        \"carClass\": \"Economic\",\n" +
                "        \"brand\": \"Daewoo\",\n" +
                "        \"model\": \"Tico\",\n" +
                "        \"seatingCapacity\": \"5\",\n" +
                "        \"engineCapacity\": \"0.8\",\n" +
                "        \"engineType\": \"Petrol\",\n" +
                "        \"mileage\": \"161806\",\n" +
                "        \"price\": \"25\",\n" +
                "        \"status\": \"Available\"\n" +
                "    }\n" +
                "]";
        return data;
    }
}