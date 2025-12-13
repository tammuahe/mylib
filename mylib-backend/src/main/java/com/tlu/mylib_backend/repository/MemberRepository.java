package com.tlu.mylib_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tlu.mylib_backend.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{

}
