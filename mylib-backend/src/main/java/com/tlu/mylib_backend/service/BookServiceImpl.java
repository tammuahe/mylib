package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.dto.BookDTO;
import com.tlu.mylib_backend.entity.Book;
import com.tlu.mylib_backend.mapper.BookMapper;
import com.tlu.mylib_backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookServiceImpl implements BookService {

    private final LocationRepository locationRepository;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;
    private final AuthorRepository authorRepository;



    
    @Override
    public Book create(BookDTO bookDTO) {
        return bookRepository.save(BookMapper.toEntity(bookDTO, categoryRepository, publisherRepository, locationRepository, authorRepository));
    }

    @Override
    public void delete(long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book update(long id, BookDTO bookDTO) {
        Book book = BookMapper.toEntity(bookDTO, categoryRepository, publisherRepository, locationRepository, authorRepository);
        Book toUpdate = bookRepository.getReferenceById(id);
        toUpdate.setTitle(book.getTitle());
        toUpdate.setAuthors(book.getAuthors());
        toUpdate.setCategories(book.getCategories());
        toUpdate.setCopyAvailable(book.getCopyAvailable());
        toUpdate.setCopyTotal(book.getCopyTotal());
        toUpdate.setEdition(book.getEdition());
        toUpdate.setLocation(book.getLocation());
        toUpdate.setPublicationYear(book.getPublicationYear());
        toUpdate.setPublisher(book.getPublisher());
        return bookRepository.save(toUpdate);
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> search(String keyword) {
        return bookRepository.searchByTitleOrAuthor(keyword);
    }
}
