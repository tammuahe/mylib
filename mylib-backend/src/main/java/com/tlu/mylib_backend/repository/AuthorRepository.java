package com.tlu.mylib_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Long>{
    List<Author> findByNameContainingIgnoreCase(String name);
}
