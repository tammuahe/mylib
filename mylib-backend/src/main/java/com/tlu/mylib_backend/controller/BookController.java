package com.tlu.mylib_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tlu.mylib_backend.dto.BookDTO;
import com.tlu.mylib_backend.entity.Book;
import com.tlu.mylib_backend.mapper.BookMapper;
import com.tlu.mylib_backend.service.BookService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping(params = "keyword")
    public ResponseEntity<List<Book>> getBooks(@RequestParam(required = false) String keyword) {
        List<Book> books;

        if (keyword == null || keyword.isBlank()) {
            books = bookService.findAll();
        } else {
            books = bookService.search(keyword);
        }

        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<BookDTO> addBook(@RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(BookMapper.fromEntity(bookService.create(bookDTO)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO book) {
        return ResponseEntity.ok(BookMapper.fromEntity(bookService.update(id, book)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
