package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.dto.BookDTO;
import com.tlu.mylib_backend.entity.Book;

public interface BookService {
    List<Book> findAll();

    List<Book> search(String keyword);

    Book create(BookDTO book);

    Book update(long id, Book book);

    void delete(long id);
}
