package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
