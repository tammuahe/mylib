package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.dto.AuthorDTO;
import com.tlu.mylib_backend.entity.Author;
import com.tlu.mylib_backend.repository.AuthorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService{
    private final AuthorRepository authorRepository;
    @Override
    public Author create(AuthorDTO authorDTO) {
        Author author = new Author();
        author.setName(authorDTO.getName());
        return authorRepository.save(author);
    }

    @Override
    public void delete(Long id) {
        authorRepository.deleteById(id);
    }

    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    @Override
    public List<Author> search(String keyword) {
        return authorRepository.findByNameContainingIgnoreCase(keyword);
    }
}
