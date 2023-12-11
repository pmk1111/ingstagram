package com.naver.ingstagram;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import com.naver.ingstagram.service.MemberDetailsService;
import com.naver.security.CustomAccessDeniedHandler;
import com.naver.security.LoginFailHandler;
import com.naver.security.LoginSuccessHandler;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final DataSource datasource;

	private final MemberDetailsService memberDetailsService;
	
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return web -> web.ignoring()
                .antMatchers("/assets/**");
     } // 정적 리소스는 모두 허용

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.authorizeRequests()
		.antMatchers("/login").permitAll()
		.antMatchers("/account/signup").permitAll()
		.antMatchers("/account/check-email").permitAll()
		.antMatchers("/account/check-nic").permitAll()
		.antMatchers("/account/email-verify").permitAll()
		.antMatchers("/account/check-verify-num").permitAll()
		.antMatchers("/account/signup-success").permitAll()
		.anyRequest().authenticated();

		http
		.csrf().ignoringAntMatchers("/account/email-verify")
		.and()
		.csrf().ignoringAntMatchers("/account/check-verify-num")
		.and()
		.csrf().ignoringAntMatchers("/account/signup-success");

		http.formLogin()
		.loginPage("/login")
		.loginProcessingUrl("/api-login")
		.usernameParameter("email")
		.passwordParameter("password")
		.successHandler(loginSuccessHandler())
		.failureHandler(loginFailHandler());

		http.logout().logoutSuccessUrl("/login")
		.logoutUrl("/logout")
		.invalidateHttpSession(true)
		.deleteCookies("remember-me","JSESSION_ID");

//		http.rememberMe()
//		.rememberMeParameter("remember-me")
//		.tokenValiditySeconds(2419200)
//		.tokenRepository(tokenRepository());
		
		http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());

		return http.build();
	}

	@Bean 
	public DaoAuthenticationProvider daoAuthenticationProvider() throws Exception{
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

		daoAuthenticationProvider.setUserDetailsService(memberDetailsService);
		daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());

		return daoAuthenticationProvider;
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	public PersistentTokenRepository tokenRepository() {
		JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
		jdbcTokenRepository.setDataSource(datasource);
		return jdbcTokenRepository;
	}
	
	@Bean
	public AuthenticationSuccessHandler loginSuccessHandler() {
		return new LoginSuccessHandler();
	}
	
	@Bean
	public AuthenticationFailureHandler loginFailHandler() {
		return new LoginFailHandler();
	}
	
	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}

}
