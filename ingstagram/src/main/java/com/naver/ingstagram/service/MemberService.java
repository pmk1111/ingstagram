package com.naver.ingstagram.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.naver.ingstagram.Dto.MemberJoinDto;
import com.naver.ingstagram.entity.Member;
import com.naver.ingstagram.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService{
	
	@PersistenceContext
    private EntityManager entityManager;
	
	private final MemberRepository memberRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Transactional(readOnly = true)
	public boolean getMemberByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }
	
	@Transactional(readOnly = true)
	public boolean getMemberByNic(String nic) {
		return memberRepository.existsByNic(nic);
	}
	
	@Transactional
	public void signUp(MemberJoinDto dto) {
		dto.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
		log.info("���� ����:" + dto.toString());
		Member member = dto.toEntity();
		memberRepository.save(member);
		entityManager.flush();
	}
}
