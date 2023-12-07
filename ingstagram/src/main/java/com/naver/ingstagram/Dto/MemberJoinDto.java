package com.naver.ingstagram.Dto;

import javax.validation.constraints.NotBlank;

import com.naver.ingstagram.entity.Member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberJoinDto {	
	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
	
	private String phone;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String nic;
	
	@NotBlank
	private String birth;
	
	
	@Builder
	public MemberJoinDto(String email, String password, String phone, 
						String name, String nic, String birth) {
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.name = name;
		this.nic = nic;
		this.birth = birth;
	}
	
	public Member toEntity(){
		return Member.builder()
				.email(email)
				.password(password)
				.phone(phone)
				.name(name)
				.nic(nic)
				.birth(birth)
				.build();
	}
}
