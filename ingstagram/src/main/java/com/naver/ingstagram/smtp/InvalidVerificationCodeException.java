package com.naver.ingstagram.smtp;

public class InvalidVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    // 추가적인 생성자가 필요한 경우에도 부모 클래스의 생성자를 호출하도록 함
    public InvalidVerificationCodeException() {
        super("인증번호가 올바르지 않습니다.");
    }
}
