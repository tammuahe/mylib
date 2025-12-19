package com.tlu.mylib_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tlu.mylib_backend.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("""
                SELECT m
                FROM Member m
                WHERE LOWER(m.searchName) LIKE CONCAT('%', LOWER(:keyword), '%')
            """)
    List<Member> searchByName(@Param("keyword") String keyword);

}
