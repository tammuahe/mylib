INSERT INTO
    categories (category_id, name)
VALUES
    (1, 'Science Fiction'),
    (2, 'Fantasy'),
    (3, 'History'),
    (4, 'Philosophy'),
    (5, 'Technology');

INSERT INTO
    authors (author_id, name)
VALUES
    (1, 'Frank Herbert'),
    (2, 'J.R.R. Tolkien'),
    (3, 'Yuval Noah Harari'),
    (4, 'Marcus Aurelius'),
    (5, 'Robert C. Martin') ON DUPLICATE KEY
UPDATE name =
VALUES
    (name);

INSERT INTO
    staffs (staff_id, first_name, last_name, phone, email)
VALUES
    (
        1,
        'Alice',
        'Johnson',
        '123-456-7890',
        'alice.johnson@example.com'
    ),
    (
        2,
        'Bob',
        'Smith',
        '234-567-8901',
        'bob.smith@example.com'
    ),
    (
        3,
        'Charlie',
        'Brown',
        '345-678-9012',
        'charlie.brown@example.com'
    ),
    (
        4,
        'Diana',
        'Prince',
        '456-789-0123',
        'diana.prince@example.com'
    ),
    (
        5,
        'Ethan',
        'Hunt',
        '567-890-1234',
        'ethan.hunt@example.com'
    );

INSERT INTO
    members (
        member_id,
        first_name,
        last_name,
        search_name,
        phone,
        city,
        email,
        is_active
    )
VALUES
    (
        1,
        'John',
        'Doe',
        'john doe doe john',
        '111-222-3333',
        'New York',
        'john.doe@example.com',
        TRUE
    ),
    (
        2,
        'Jane',
        'Smith',
        'jane smith smith jane',
        '222-333-4444',
        'Los Angeles',
        'jane.smith@example.com',
        TRUE
    ),
    (
        3,
        'Michael',
        'Johnson',
        'michael johnson johnson michael',
        '333-444-5555',
        'Chicago',
        'michael.johnson@example.com',
        FALSE
    ),
    (
        4,
        'Emily',
        'Davis',
        'emily davis davis emily',
        '444-555-6666',
        'Houston',
        'emily.davis@example.com',
        TRUE
    ),
    (
        5,
        'David',
        'Wilson',
        'david wilson wilson david',
        '555-666-7777',
        'Phoenix',
        'david.wilson@example.com',
        TRUE
    );

INSERT INTO
    locations (location_id, shelf_no, shelf_name, floor_no)
VALUES
    (1, 101, 'Shelf A', 1),
    (2, 102, 'Shelf B', 1),
    (3, 201, 'Shelf C', 2),
    (4, 202, 'Shelf D', 2),
    (5, 301, 'Shelf E', 3);

INSERT INTO
    publishers (publisher_id, name, language)
VALUES
    (1, 'Penguin Books', 'EN'),
    (2, 'Bloomsbury', 'EN'),
    (3, 'Kodansha', 'JA'),
    (4, 'Unknown Publisher', 'EN'),
    (5, 'Prentice Hall', 'EN') ON DUPLICATE KEY
UPDATE name =
VALUES
    (name),
    language =
VALUES
    (language);

INSERT INTO
    books (
        book_id,
        title,
        publisher_id,
        publication_year,
        edition,
        copy_total,
        copy_available,
        location_id
    )
VALUES
    (1, 'Dune', 1, 1965, 1, 7, 5, 1),
    (2, 'The Hobbit', 2, 1937, 1, 10, 10, 2),
    (
        3,
        'Sapiens: A Brief History of Humankind',
        3,
        2011,
        1,
        4,
        3,
        3
    ),
    (4, 'Meditations', 4, 180, 1, 6, 6, 4),
    (5, 'Clean Code', 5, 2008, 1, 8, 8, 5) ON DUPLICATE KEY
UPDATE title =
VALUES
    (title),
    publisher_id =
VALUES
    (publisher_id),
    publication_year =
VALUES
    (publication_year),
    edition =
VALUES
    (edition),
    copy_total =
VALUES
    (copy_total),
    copy_available =
VALUES
    (copy_available),
    location_id =
VALUES
    (location_id);

INSERT INTO
    books_categories (book_id, category_id)
VALUES
    (1, 1), -- Dune -> Science Fiction
    (2, 2), -- The Hobbit -> Fantasy
    (3, 3), -- Sapiens -> History
    (4, 4), -- Meditations -> Philosophy
    (5, 5);

-- Clean Code -> Technology
INSERT INTO
    books_authors (book_id, author_id)
VALUES
    (1, 1), -- Dune -> Frank Herbert
    (2, 2), -- The Hobbit -> J.R.R. Tolkien
    (3, 3), -- Sapiens -> Yuval Noah Harari
    (4, 4), -- Meditations -> Marcus Aurelius
    (5, 5);

-- Clean Code -> Robert C. Martin
INSERT INTO
    borrow (
        borrow_id,
        book_id,
        member_id,
        borrow_at,
        return_at,
        status,
        staff_id,
        duration_days
    )
VALUES
    (
        1,
        1,
        1,
        '2025-12-01 10:00:00',
        '2025-12-15 10:00:00',
        'BORROWED',
        1,
        14
    ),
    (
        2,
        2,
        2,
        '2025-12-05 09:30:00',
        NULL,
        'BORROWED',
        2,
        14
    ),
    (
        3,
        3,
        3,
        '2025-11-20 14:00:00',
        '2025-12-05 14:00:00',
        'RETURNED',
        1,
        15
    ),
    (
        4,
        1,
        4,
        '2025-12-10 11:00:00',
        NULL,
        'OVERDUE',
        3,
        7
    ),
    (
        5,
        4,
        5,
        '2025-12-12 16:00:00',
        NULL,
        'LOST',
        2,
        30
    );