package com.naver.ingstagram.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.naver.ingstagram.repository.MemberRepository;
import com.naver.ingstagram.service.MemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class HomeController {

	private final MemberRepository memberRepository;
	
	@GetMapping("/login")
	public String login(@RequestParam(value = "error", required = false) String error,
						@RequestParam(value = "exception", required = false) String exception,
						Model model) {
		model.addAttribute("error", error);
		model.addAttribute("exception", exception);
		return "/login";
	}
	
	
	@GetMapping("/loginSuccess")
	public String loginSuccess(@AuthenticationPrincipal MemberDetails member, RedirectAttributes redirectAttrs) {
		log.info("접속한 사용자: " + member.getUsername());
		return "redirect:/account/main";
	}
	
}
