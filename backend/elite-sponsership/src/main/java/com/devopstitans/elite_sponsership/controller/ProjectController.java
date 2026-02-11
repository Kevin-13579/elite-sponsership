package com.devopstitans.elite_sponsership.controller;

import com.devopstitans.elite_sponsership.model.Project;
import com.devopstitans.elite_sponsership.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final String UPLOAD_DIR = "D:/Elite-Sponsership/uploads/";

    @Autowired
    private ProjectRepository projectRepo;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProject(
            @RequestParam("title") String title,
            @RequestParam("expectedFunds") Double expectedFunds,
            @RequestParam("video") MultipartFile video,
            @RequestParam("pdf") MultipartFile pdf, // Primary PDF (Resume/Report)
            @RequestParam("verifyPdf") MultipartFile verifyPdf, // Verification PDF
            @RequestParam("studentId") Long studentId,
            @RequestParam("description") String description,
            @RequestParam("techStack") String techStack) {

        try {
            // 1. Ensure upload directory exists
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) directory.mkdirs();

            // 2. Save Video File
            String videoName = System.currentTimeMillis() + "_video_" + video.getOriginalFilename();
            video.transferTo(new File(UPLOAD_DIR + videoName));

            // 3. Save Primary PDF File (Project Report/Resume)
            String pdfName = System.currentTimeMillis() + "_report_" + pdf.getOriginalFilename();
            pdf.transferTo(new File(UPLOAD_DIR + pdfName));

            // 4. Save Verification PDF File (Email Confirmation)
            String verifyPdfName = System.currentTimeMillis() + "_verify_" + verifyPdf.getOriginalFilename();
            verifyPdf.transferTo(new File(UPLOAD_DIR + verifyPdfName));

            // 5. Map to Project Object
            Project project = new Project();
            project.setTitle(title);
            project.setExpectedFunds(expectedFunds);
            project.setDescription(description);
            project.setTechStack(techStack);
            project.setStudentId(studentId);
            
            // Store the filenames in the database
            project.setVideoPath(videoName);
            project.setPdfPath(pdfName);
            project.setVerificationPdfPath(verifyPdfName);

            // 6. Save to MySQL
            projectRepo.save(project);
            
            return ResponseEntity.ok("Project uploaded and verified successfully!");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("File Upload Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepo.findAll());
    }
}