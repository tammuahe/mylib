package com.tlu.mylib_backend.mapper;

import com.tlu.mylib_backend.dto.BorrowDTO;
import com.tlu.mylib_backend.entity.Borrow;
import com.tlu.mylib_backend.repository.BookRepository;
import com.tlu.mylib_backend.repository.MemberRepository;
import com.tlu.mylib_backend.repository.StaffRepository;

public class BorrowMapper {

        public static BorrowDTO fromEntity(Borrow borrow) {
                BorrowDTO dto = new BorrowDTO();

                dto.setId(borrow.getId());
                dto.setBorrowAt(borrow.getBorrowAt());
                dto.setReturnAt(borrow.getReturnAt());
                dto.setStatus(borrow.getStatus());

                dto.setBookId(
                                borrow.getBook() != null ? borrow.getBook().getId() : null);
                dto.setMemberId(
                                borrow.getMember() != null ? borrow.getMember().getId() : null);
                dto.setStaffId(
                                borrow.getIssuedBy() != null ? borrow.getIssuedBy().getId() : null);

                dto.setDurationDay(borrow.getDurationDay() != null ? borrow.getDurationDay() : null);
                return dto;
        }

        public static Borrow toEntity(
                        BorrowDTO dto,
                        BookRepository bookRepo,
                        MemberRepository memberRepo,
                        StaffRepository staffRepo) {
                Borrow borrow = new Borrow();

                borrow.setId(dto.getId());
                borrow.setBorrowAt(dto.getBorrowAt());
                borrow.setReturnAt(dto.getReturnAt());
                borrow.setStatus(dto.getStatus());
                borrow.setDurationDay(dto.getDurationDay());

                if (dto.getBookId() != null) {
                        borrow.setBook(
                                        bookRepo.findById(dto.getBookId()).orElse(null));
                }

                if (dto.getMemberId() != null) {
                        borrow.setMember(
                                        memberRepo.findById(dto.getMemberId()).orElse(null));
                }

                if (dto.getStaffId() != null) {
                        borrow.setIssuedBy(
                                        staffRepo.findById(dto.getStaffId()).orElse(null));
                }

                return borrow;
        }
}
