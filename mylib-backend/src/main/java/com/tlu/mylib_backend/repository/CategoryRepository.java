package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
