package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;

public interface BorrowService {
    List<Borrow> getAllBorrows();

    Borrow addBorrow(Borrow borrow);

    void deleteBorrowById(long id);

    Borrow updateBorrowStatusById(long id, BorrowStatus borrowStatus);
}
