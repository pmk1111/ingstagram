package com.naver.security;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class LoginFailHandler extends SimpleUrlAuthenticationFailureHandler{

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {

		String errorMessage;

		if(exception instanceof BadCredentialsException) {
			errorMessage = "�߸��� ��й�ȣ�Դϴ�. �ٽ� Ȯ���ϼ���.";
		} else if (exception instanceof InternalAuthenticationServiceException) {
			errorMessage = "���� �ý��� ������ �α��� ��û�� ó���� �� �����ϴ�. �����ڿ��� �����ϼ���. ";
		} else if (exception instanceof UsernameNotFoundException) {
			errorMessage = "�������� �ʴ� �����Դϴ�. ȸ������ �� �α������ּ���.";
		} else if (exception instanceof AuthenticationCredentialsNotFoundException) {
			errorMessage = "���� ��û�� �źεǾ����ϴ�. �����ڿ��� �����ϼ���.";
		} else {
			errorMessage = "�� �� ���� ������ �α��� ��û�� ó���� �� �����ϴ�. �����ڿ��� �����ϼ���.";
		}

		errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
		setDefaultFailureUrl("/login?error=true&exception=" + errorMessage);
		super.onAuthenticationFailure(request, response, exception);
	}

}
