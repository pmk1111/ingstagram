package com.naver.ingstagram.smtp;

public class InvalidVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    // �߰����� �����ڰ� �ʿ��� ��쿡�� �θ� Ŭ������ �����ڸ� ȣ���ϵ��� ��
    public InvalidVerificationCodeException() {
        super("������ȣ�� �ùٸ��� �ʽ��ϴ�.");
    }
}
