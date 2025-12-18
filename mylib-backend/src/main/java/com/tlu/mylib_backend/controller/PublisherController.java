package com.tlu.mylib_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tlu.mylib_backend.dto.PublisherDTO;
import com.tlu.mylib_backend.entity.Publisher;
import com.tlu.mylib_backend.service.PublisherService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/publisher")
public class PublisherController {

    private final PublisherService publisherService;

    @GetMapping
    public ResponseEntity<List<Publisher>> getPublishers(
            @RequestParam(required = false) String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return ResponseEntity.ok(publisherService.findAll());
        } else {
            return ResponseEntity.ok(publisherService.search(keyword));
        }
    }

    @PostMapping
    public ResponseEntity<Publisher> addPublisher(@RequestBody PublisherDTO publisherDTO) {
        return ResponseEntity.ok(publisherService.create(publisherDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable Long id) {
        publisherService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
