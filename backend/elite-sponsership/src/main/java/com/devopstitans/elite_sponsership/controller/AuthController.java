package com.devopstitans.elite_sponsership.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.devopstitans.elite_sponsership.model.User;
import com.devopstitans.elite_sponsership.repository.UserRepository;

import java.util.Optional; // <--- THIS WAS MISSING!

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try {
            User savedUser = repo.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        // Find user by email
        Optional<User> user = repo.findByEmail(loginData.getEmail());
        
        if (user.isPresent() && user.get().getPassword().equals(loginData.getPassword())) {
            // Success: Return the full user object (including role) to the frontend
            return ResponseEntity.ok(user.get());
        } else {
            // Failure: Return 401 Unauthorized
            return ResponseEntity.status(401).body("Invalid Email or Password");
        }
    }
}