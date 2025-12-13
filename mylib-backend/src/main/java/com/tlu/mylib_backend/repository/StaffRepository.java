package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long>{

}
