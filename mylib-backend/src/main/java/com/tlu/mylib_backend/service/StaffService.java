package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Staff;


public interface StaffService {
    List<Staff> findAll();

    Staff create(Staff staff);

    void delete(long id);
}
