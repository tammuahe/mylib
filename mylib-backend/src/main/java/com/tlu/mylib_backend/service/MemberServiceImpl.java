package com.tlu.mylib_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tlu.mylib_backend.entity.Member;
import com.tlu.mylib_backend.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    @Override
    public Member create(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public void delete(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    @Override
    public Member update(Long id, Member member) {
        Member toUpdate = memberRepository.getReferenceById(id);
        toUpdate.setActive(member.isActive());
        toUpdate.setCity(member.getCity());
        toUpdate.setEmail(member.getEmail());
        toUpdate.setFirstName(member.getFirstName());
        toUpdate.setLastName(member.getLastName());
        toUpdate.setPhone(member.getPhone());
        return memberRepository.save(toUpdate);
    }

    @Override
    public List<Member> search(String keyword) {
        return memberRepository.searchByName(keyword);
    }
}
