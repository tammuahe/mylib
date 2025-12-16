package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;
import com.tlu.mylib_backend.repository.BorrowRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService{
    
    private final BorrowRepository borrowRepository;
    
    @Override
    public Borrow create(Borrow borrow) {
        return borrowRepository.save(borrow);
    }

    @Override
    public void delete(long id) {
        borrowRepository.deleteById(id);
    }

    @Override
    public List<Borrow> findAll() {
        return borrowRepository.findAll();
    }

    @Override
    public Borrow updateStatus(long id, BorrowStatus borrowStatus) {
        Borrow toUpdate = borrowRepository.getReferenceById(id);
        toUpdate.setStatus(borrowStatus);
        return borrowRepository.save(toUpdate);
    }

}
