package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Book;

public interface BookService {
    List<Book> getAllBooks();

    List<Book> searchBooksByTitleOrAuthor(String keyword);

    Book addBook(Book book);

    Book updateBookById(long id, Book book);

    void deleteBookById(long id);
}
