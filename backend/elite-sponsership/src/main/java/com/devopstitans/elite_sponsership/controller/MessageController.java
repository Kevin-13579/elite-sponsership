package com.devopstitans.elite_sponsership.controller;

import com.devopstitans.elite_sponsership.model.Message;
import com.devopstitans.elite_sponsership.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageRepository messageRepo;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message msg) {
        return messageRepo.save(msg);
    }

    @GetMapping("/history/{u1}/{u2}")
    public List<Message> getHistory(@PathVariable Long u1, @PathVariable Long u2) {
        return messageRepo.findChatHistory(u1, u2);
    }
}