package com.tlu.mylib_backend.mapper;

import java.util.stream.Collectors;

import com.tlu.mylib_backend.dto.BookDTO;
import com.tlu.mylib_backend.entity.Book;
import com.tlu.mylib_backend.repository.AuthorRepository;
import com.tlu.mylib_backend.repository.CategoryRepository;
import com.tlu.mylib_backend.repository.LocationRepository;
import com.tlu.mylib_backend.repository.PublisherRepository;

public class BookMapper {
    public static BookDTO fromEntity(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());

        if (book.getCategories() != null) {
            dto.setCategoryIds(book.getCategories().stream()
                    .map(c -> c.getId())
                    .collect(Collectors.toSet()));
        }

        dto.setPublisherId(book.getPublisher() != null ? book.getPublisher().getId() : null);
        dto.setPublicationYear(book.getPublicationYear());
        dto.setEdition(book.getEdition());
        dto.setCopyTotal(book.getCopyTotal());
        dto.setCopyAvailable(book.getCopyAvailable());
        dto.setLocationId(book.getLocation() != null ? book.getLocation().getId() : null);

        if (book.getAuthors() != null) {
            dto.setAuthorIds(book.getAuthors().stream()
                    .map(a -> a.getId())
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

    public static Book toEntity(
            BookDTO dto,
            CategoryRepository categoryRepo,
            PublisherRepository publisherRepo,
            LocationRepository locationRepo,
            AuthorRepository authorRepo) {

        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setPublicationYear(dto.getPublicationYear());
        book.setEdition(dto.getEdition());
        book.setCopyTotal(dto.getCopyTotal());
        book.setCopyAvailable(dto.getCopyAvailable());

        if (dto.getCategoryIds() != null) {
            book.setCategories(
                    categoryRepo.findAllById(dto.getCategoryIds())
                            .stream()
                            .collect(Collectors.toSet()));
        }

        if (dto.getPublisherId() != null) {
            book.setPublisher(
                    publisherRepo.findById(dto.getPublisherId()).orElse(null));
        }

        if (dto.getLocationId() != null) {
            book.setLocation(
                    locationRepo.findById(dto.getLocationId()).orElse(null));
        }

        if (dto.getAuthorIds() != null) {
            book.setAuthors(
                    authorRepo.findAllById(dto.getAuthorIds())
                            .stream()
                            .collect(Collectors.toSet()));
        }

        return book;
    }
}
