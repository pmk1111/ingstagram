package com.naver.ingstagram.smtp;

public class InvalidVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public InvalidVerificationCodeException() {
        super("인증번호가 올바르지 않습니다.");
    }
}
