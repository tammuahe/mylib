package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.dto.PublisherDTO;
import com.tlu.mylib_backend.entity.Publisher;

public interface PublisherService {

    Publisher create(PublisherDTO publisherDTO);

    List<Publisher> findAll();

    List<Publisher> search(String keyword);

    void delete(Long id);
}
