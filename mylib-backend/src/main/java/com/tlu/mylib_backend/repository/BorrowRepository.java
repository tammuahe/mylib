package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Borrow;

public interface BorrowRepository extends JpaRepository<Borrow,Long>{

}
