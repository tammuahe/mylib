package com.tlu.mylib_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long>{
 List<Publisher> findByNameContainingIgnoreCase(String name);
}
