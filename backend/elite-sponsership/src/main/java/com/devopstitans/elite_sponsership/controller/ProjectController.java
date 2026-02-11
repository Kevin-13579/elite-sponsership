package com.devopstitans.elite_sponsership.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.devopstitans.elite_sponsership.model.Project;
import com.devopstitans.elite_sponsership.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ProjectRepository projectRepo;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProject(
            @RequestParam("title") String title,
            @RequestParam("expectedFunds") Double expectedFunds,
            @RequestParam("video") MultipartFile video,
            @RequestParam("pdf") MultipartFile pdf,
            @RequestParam("verifyPdf") MultipartFile verifyPdf,
            @RequestParam("studentId") Long studentId,
            @RequestParam("description") String description,
            @RequestParam("techStack") String techStack) {

        try {
            // 1. Upload Video to Cloudinary
            Map videoUpload = cloudinary.uploader().upload(video.getBytes(), 
                ObjectUtils.asMap("resource_type", "video"));
            String videoUrl = (String) videoUpload.get("secure_url");

            // 2. Upload Primary PDF
            Map pdfUpload = cloudinary.uploader().upload(pdf.getBytes(), 
                ObjectUtils.asMap("resource_type", "auto"));
            String pdfUrl = (String) pdfUpload.get("secure_url");

            // 3. Upload Verification PDF
            Map verifyUpload = cloudinary.uploader().upload(verifyPdf.getBytes(), 
                ObjectUtils.asMap("resource_type", "auto"));
            String verifyUrl = (String) verifyUpload.get("secure_url");

            // 4. Save to Database
            Project project = new Project();
            project.setTitle(title);
            project.setExpectedFunds(expectedFunds);
            project.setDescription(description);
            project.setTechStack(techStack);
            project.setStudentId(studentId);
            
            // Saving the HTTPS Cloudinary URLs
            project.setVideoPath(videoUrl);
            project.setPdfPath(pdfUrl);
            project.setVerificationPdfPath(verifyUrl);

            projectRepo.save(project);
            return ResponseEntity.ok("Project Live on Cloud!");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Cloud Upload Failed: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepo.findAll());
    }
}