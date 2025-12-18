package com.tlu.mylib_backend.dto;

import java.time.LocalDateTime;

import com.tlu.mylib_backend.enums.BorrowStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BorrowDTO {

    private long id;

    private Long bookId;
    private Long memberId;
    private Long staffId;

    private LocalDateTime borrowAt;
    private LocalDateTime returnAt;

    private BorrowStatus status;
}
