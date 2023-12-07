package com.naver.ingstagram.smtp;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.naver.ingstagram.utils.RedisUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
	
	private final RedisUtil redisUtil;
    private final JavaMailSender javaMailSender;

    //������ȣ ����
    private final String ePw = createKey();

    @Value("${spring.mail.username}")
    private String id;
    

    public MimeMessage createMessage(String to)throws MessagingException, UnsupportedEncodingException {
        log.info("������ ��� : "+ to);
        log.info("���� ��ȣ : " + ePw);
        MimeMessage  message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); 
        message.setSubject("������ ȸ������ ���� �ڵ�: "); 

        String msg="";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">�̸��� �ּ� Ȯ��</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">�Ʒ� Ȯ�� �ڵ带 ȸ������ ȭ�鿡�� �Է����ּ���.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += ePw;
        msg += "</td></tr></tbody></table></div>";

        message.setText(msg, "utf-8", "html"); //����, charsetŸ��, subtype
        message.setFrom(new InternetAddress(id,"Ingstagram")); //������ ����� ���� �ּ�, ������ ��� �̸�

        return message;
    }
    
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // �����ڵ� 6�ڸ�
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public String sendSimpleMessage(String to)throws Exception {
        MimeMessage message = createMessage(to);
        try{
        	redisUtil.setDataExpire(ePw, to, 60 * 1L); // ��ȿ�ð� 1��
            javaMailSender.send(message); // ���� �߼�
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw; // ���Ϸ� ���´� ���� �ڵ带 ������ ����
    }
    
    public String verifyEmail(String key) throws ChangeSetPersister.NotFoundException {
        String memberEmail = redisUtil.getData(key);
        if (memberEmail == null) {
            throw new InvalidVerificationCodeException();
        }
        redisUtil.deleteData(key);
        return ePw;
    }

}
