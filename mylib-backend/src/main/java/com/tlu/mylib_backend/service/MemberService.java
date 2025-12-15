package com.tlu.mylib_backend.service;

import java.util.List;

import com.tlu.mylib_backend.entity.Member;

public interface MemberService {
    List<Member> getAllMembers();

    Member addMember(Member member);

    Member updateMemberById(long id, Member member);

    void deleteMemberById(long id);
}
