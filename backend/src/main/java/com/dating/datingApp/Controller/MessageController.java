package com.dating.datingApp.Controller;

import com.dating.datingApp.Entity.Message;
import com.dating.datingApp.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping
    public ResponseEntity<Message> createOrUpdateMessage(@RequestBody Message message) {
        Optional<Message> existingMessage = messageRepository.findById(message.getId());

        if (existingMessage.isPresent()) {
            return ResponseEntity.ok(existingMessage.get());
        } else {
            Message savedMessage = messageRepository.save(message);
            return ResponseEntity.ok(savedMessage);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable String id) {
        Optional<Message> message = messageRepository.findById(id);
        if (message.isPresent()) {
            return ResponseEntity.ok(message.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Message> addMessageToItem(@RequestBody AddMessageRequest request) {
        Optional<Message> existingMessage = messageRepository.findById(request.getId());
        if (existingMessage.isPresent()) {
            Message msgToUpdate = existingMessage.get();
            msgToUpdate.getItems().add(request.getMess());
            messageRepository.save(msgToUpdate);

            return ResponseEntity.ok(msgToUpdate);
        } else {
            return ResponseEntity.notFound().build(); // Si le message n'existe pas
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String id) {
        messageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
