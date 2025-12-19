package com.tlu.mylib_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.enums.BorrowStatus;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    @Query(value = "SELECT * FROM borrow b \n" +
            "WHERE b.status = :status \n" +
            "AND b.borrow_at < DATE_SUB(NOW(), INTERVAL b.duration_day DAY)", nativeQuery = true)
    List<Borrow> findOverdueBorrows(@Param("status") BorrowStatus status);

}
