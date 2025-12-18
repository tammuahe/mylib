package com.tlu.mylib_backend.dto;

import com.tlu.mylib_backend.enums.Language;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PublisherDTO {
    private String name;
    private Language language;
}
