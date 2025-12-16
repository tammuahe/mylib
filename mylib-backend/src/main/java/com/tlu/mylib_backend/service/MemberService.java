package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Member;

public interface MemberService {
    List<Member> findAll();

    Member create(Member member);

    Member update(Long id, Member member);

    void delete(Long id);
}
