package com.naver.ingstagram.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.naver.ingstagram.entity.Member;

import lombok.Getter;

@Getter
public class MemberDetails implements UserDetails{
	
	private Member member;
	
	public MemberDetails(Member member) {
		this.member = member;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collectors = new ArrayList<>();
        collectors.add(() -> {
            return "ROLE_MEMBER";
        });
        return collectors;
	}
	@Override
	public String getUsername() {
		return member.getEmail();
	}
	@Override
	public String getPassword() {
		return member.getPassword();
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}

}
