package com.tlu.mylib_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.dto.BorrowDTO;
import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;
import com.tlu.mylib_backend.mapper.BorrowMapper;
import com.tlu.mylib_backend.repository.BookRepository;
import com.tlu.mylib_backend.repository.BorrowRepository;
import com.tlu.mylib_backend.repository.MemberRepository;
import com.tlu.mylib_backend.repository.StaffRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRepository borrowRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final StaffRepository staffRepository;

    @Override
    public Borrow create(BorrowDTO borrow) {
        return borrowRepository.save(BorrowMapper.toEntity(borrow, bookRepository, memberRepository, staffRepository));
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
        if (borrowStatus == BorrowStatus.RETURNED) {
            toUpdate.setReturnAt(LocalDateTime.now());
        }
        return borrowRepository.save(toUpdate);
    }

    @Override
    public Borrow findById(Long id) {
        return borrowRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Borrow not found with id " + id));
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateOverdueStatus() {
        List<Borrow> overdueBorrows = borrowRepository.findOverdueBorrows(BorrowStatus.BORROWED);
        
        for (Borrow borrow : overdueBorrows) {
            borrow.setStatus(BorrowStatus.OVERDUE);
        }
        borrowRepository.saveAll(overdueBorrows);
    }

}
