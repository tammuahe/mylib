package com.tlu.mylib_backend.dto;

import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BookDTO {
    private long id;
    private String title;
    private Set<Long> categoryIds;
    private Long publisherId;
    private Integer publicationYear;
    private Integer edition;
    private Integer copyTotal;
    private Integer copyAvailable;
    private Integer locationId;
    private Set<Long> authorIds;
}
