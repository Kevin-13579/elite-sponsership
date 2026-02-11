package com.devopstitans.elite_sponsership.repository;

import com.devopstitans.elite_sponsership.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User>findByEmail(String email);
}
    

