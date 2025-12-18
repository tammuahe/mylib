package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.dto.BorrowDTO;
import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;
import com.tlu.mylib_backend.mapper.BorrowMapper;
import com.tlu.mylib_backend.repository.BookRepository;
import com.tlu.mylib_backend.repository.BorrowRepository;
import com.tlu.mylib_backend.repository.MemberRepository;
import com.tlu.mylib_backend.repository.StaffRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService{
    
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
        return borrowRepository.save(toUpdate);
    }

}
