package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Staff;


public interface StaffService {
    List<Staff> getAllStaffs();

    Staff addStaff(Staff staff);

    void deleteStaffById(long id);
}
