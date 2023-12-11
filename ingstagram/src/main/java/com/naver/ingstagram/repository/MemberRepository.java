package com.naver.ingstagram.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.naver.ingstagram.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{
	public boolean existsByEmail(String email);
	
	public boolean existsByNic(String nic);
	
	public Member findByEmail(String email);
}
