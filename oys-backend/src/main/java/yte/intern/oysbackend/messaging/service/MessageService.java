package yte.intern.oysbackend.messaging.service;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.messaging.entity.dto.OutputMessage;
import yte.intern.oysbackend.messaging.entity.dto.TextMessageRequest;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final SimpMessagingTemplate simpMessagingTemplate;


    public TextMessageRequest sendMessage(TextMessageRequest messageResponse) {
        simpMessagingTemplate.convertAndSend("/topic/message", messageResponse);
        return messageResponse;
    }

    public void sendSpecific(TextMessageRequest message, Principal user, String sessionId) {

    }

    public OutputMessage recMessage(TextMessageRequest message) {
        OutputMessage out = OutputMessage.fromTextMessage(message);
        simpMessagingTemplate.convertAndSendToUser(message.to(), "/private", out);
        return out;
    }

}
