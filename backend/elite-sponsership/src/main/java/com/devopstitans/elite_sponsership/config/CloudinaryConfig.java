package com.devopstitans.elite_sponsership.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dv1dtn3a1");
        config.put("api_key", "386332728357124");
        config.put("api_secret", "VlpD4qE9vpMfXbr5uZYTdoQSnT4");
        return new Cloudinary(config);
    }
}