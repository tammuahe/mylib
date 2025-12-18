package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.dto.PublisherDTO;
import com.tlu.mylib_backend.entity.Publisher;
import com.tlu.mylib_backend.repository.PublisherRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublisherServiceImpl implements PublisherService {

    private final PublisherRepository publisherRepository;

    @Override
    public Publisher create(PublisherDTO publisherDTO) {
        Publisher publisher = new Publisher();
        publisher.setName(publisherDTO.getName());
        publisher.setLanguage(publisherDTO.getLanguage());
        return publisherRepository.save(publisher);
    }

    @Override
    public void delete(Long id) {
        publisherRepository.deleteById(id);
    }

    @Override
    public List<Publisher> findAll() {
        return publisherRepository.findAll();
    }

    @Override
    public List<Publisher> search(String keyword) {
        return publisherRepository.findByNameContainingIgnoreCase(keyword);
    }
}
