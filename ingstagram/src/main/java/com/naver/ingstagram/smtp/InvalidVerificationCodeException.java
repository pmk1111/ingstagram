package com.naver.ingstagram.smtp;

public class InvalidVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public InvalidVerificationCodeException() {
        super("������ȣ�� �ùٸ��� �ʽ��ϴ�.");
    }
}
