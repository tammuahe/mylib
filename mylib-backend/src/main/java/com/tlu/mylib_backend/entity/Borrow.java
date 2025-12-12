package com.tlu.mylib_backend.entity;

import java.time.LocalDateTime;

import com.tlu.mylib_backend.enums.BorrowStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "borrow")
@NoArgsConstructor
@Getter
@Setter
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "borrow_at")
    private LocalDateTime borrowAt;

    @Column(name = "return_at")
    private LocalDateTime returnAt;

    @Enumerated(EnumType.STRING)
    private BorrowStatus status;
    
    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff issuedBy;

}
