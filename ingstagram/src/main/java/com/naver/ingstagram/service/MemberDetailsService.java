package com.naver.ingstagram.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.naver.ingstagram.entity.Member;
import com.naver.ingstagram.repository.MemberRepository;

@Service
@Transactional
public class MemberDetailsService implements UserDetailsService{

	private MemberRepository memberRepository;
	
	@Autowired
	public MemberDetailsService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		Member member = memberRepository.findByEmail(username);
		if (member == null) {
			System.out.println("사용자 정보가 없습니다.");
			throw new UsernameNotFoundException("username " + username + " not found");
		}
		return new MemberDetails(member);
	}
}
