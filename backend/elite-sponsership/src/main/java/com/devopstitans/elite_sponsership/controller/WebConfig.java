package com.devopstitans.elite_sponsership.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This maps the URL "http://localhost:8080/uploads/..." 
        // to the physical folder "D:/Elite-Sponsership/uploads/"
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///D:/Elite-Sponsership/uploads/");
    }
}