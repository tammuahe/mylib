package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.entity.Staff;
import com.tlu.mylib_backend.repository.StaffRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService{
    private final StaffRepository staffRepository;

    @Override
    public Staff create(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public void delete(long id) {
        staffRepository.deleteById(id);
    }

    @Override
    public List<Staff> findAll() {
        return staffRepository.findAll();
    }

}
