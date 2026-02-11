package com.devopstitans.elite_sponsership.repository;

import com.devopstitans.elite_sponsership.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.senderId = ?1 AND m.receiverId = ?2) OR (m.senderId = ?2 AND m.receiverId = ?1) ORDER BY m.timestamp ASC")
    List<Message> findChatHistory(Long user1, Long user2);
}