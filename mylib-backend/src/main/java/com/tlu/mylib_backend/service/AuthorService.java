package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.dto.AuthorDTO;
import com.tlu.mylib_backend.entity.Author;

public interface AuthorService {
    Author create(AuthorDTO authorDTO);

    List<Author> findAll();

    List<Author> search(String keyword);

    void delete(Long id);
}
