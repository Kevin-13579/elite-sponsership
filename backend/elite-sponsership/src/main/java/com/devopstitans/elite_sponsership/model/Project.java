package com.devopstitans.elite_sponsership.model;

import jakarta.persistence.*;
import lombok.Data; // Only if you have Lombok, otherwise write getters/setters

@Entity
@Table(name = "projects")
@Data // This generates getters/setters automatically
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 1000) // Allows for longer descriptions
    private String description;
    
    private String techStack;
    private String videoPath;
    private String pdfPath;
    private Long studentId;
    private Double expectedFunds;
    private String verificationPdfPath;
}