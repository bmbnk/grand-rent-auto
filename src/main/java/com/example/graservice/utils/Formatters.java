package com.example.graservice.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;


// Class used to collect static methods used to formatting
public class Formatters {

    // method used to format dates
    public static LocalDate getDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale(Locale.ENGLISH);
        return LocalDate.parse(date, formatter);
    }
}
