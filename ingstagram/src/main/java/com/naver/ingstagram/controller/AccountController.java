package com.naver.ingstagram.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.naver.ingstagram.Dto.MemberJoinDto;
import com.naver.ingstagram.entity.Member;
import com.naver.ingstagram.repository.MemberRepository;
import com.naver.ingstagram.service.MemberService;
import com.naver.ingstagram.smtp.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;

@Slf4j
@Controller
@RequestMapping(value = "/account")
@RequiredArgsConstructor
public class AccountController {

	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final EmailService emailService;

	@GetMapping("/signup")
	public String signUp() {
		return "account/signup";
	}

	@GetMapping("/main")
	public String main() {
		return "account/main";
	}

	@GetMapping("/check-email")
	@ResponseBody
	public boolean checkEmail(String email) {
		return memberRepository.existsByEmail(email);
	}

	@GetMapping("/check-nic")
	@ResponseBody
	public boolean checkNic(String nic) {
		return memberRepository.existsByNic(nic);
	}

	@PostMapping("/email-verify")
	@ResponseBody
	public String verifyEmail(@RequestBody Map<String, String> requestBody) throws Exception {
		String email = requestBody.get("email");
		log.info("�޴� ���: " + email);
		String code = emailService.sendSimpleMessage(email);
		log.info("�����ڵ� : " + code);
		return code;
	}

	@PostMapping("/check-verify-num")
	@ResponseBody
	public boolean checkVerifyNum(@RequestBody Map<String, String> requestBody) throws Exception{
		String code = requestBody.get("code");
		if(emailService.verifyEmail(code) != null) {
			log.info("������ȣ�� ��ġ�մϴ�.");
			return true;
		}
		return false;
	}

	@PostMapping("/signup-success")
	@ResponseBody
	public boolean signupSuccess(@RequestBody MemberJoinDto memberJoinDto) throws Exception{
		try {
			log.info("signup-success ��Ʈ�ѷ�");
			log.info(memberJoinDto.toString());
			memberService.signUp(memberJoinDto);
	        log.info("ȸ������ ����");
	        return true;
		} catch (Exception e) {
			log.error("ȸ������ ����", e);
			return false;
		}
	}
}
