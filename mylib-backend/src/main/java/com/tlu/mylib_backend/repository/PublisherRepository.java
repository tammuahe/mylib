package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long>{

}
