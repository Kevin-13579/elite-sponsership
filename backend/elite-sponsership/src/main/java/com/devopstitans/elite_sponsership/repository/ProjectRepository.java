package com.devopstitans.elite_sponsership.repository;

import com.devopstitans.elite_sponsership.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    // This allows us to find all projects uploaded by a specific student
    List<Project> findByStudentId(Long studentId);
    
    // This will be useful later for your keyword-based ranking algorithm
    List<Project> findByTechStackContaining(String keyword);
}