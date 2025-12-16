package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;

public interface BorrowService {
    List<Borrow> findAll();

    Borrow create(Borrow borrow);

    void delete(long id);

    Borrow updateStatus(long id, BorrowStatus borrowStatus);
}
