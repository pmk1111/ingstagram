package com.naver.ingstagram.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Entity
@Builder
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(value = {AuditingEntityListener.class}) // AuditingEntityListener : JPA ���ο��� ��ƼƼ ��ü�� ����/���� �Ǵ°��� �����ϴ� ����
@SequenceGenerator(
		name = "MEMBER_ID_GENERATOR",
		sequenceName = "MEMBER_ID",
		initialValue = 1,
		allocationSize = 1)
public class Member{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_ID_GENERATOR")
	private Long id;
	private String email;
	private String password;
	private String phone;
	private String name;
	private String nic;
	private String gender;
	private String birth;
	private String intro;
	private String website;
	private String profile;
	private String role;
}
