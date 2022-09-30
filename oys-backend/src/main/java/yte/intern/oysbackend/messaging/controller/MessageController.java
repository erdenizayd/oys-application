package yte.intern.oysbackend.messaging.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.oysbackend.messaging.entity.dto.OutputMessage;
import yte.intern.oysbackend.messaging.entity.dto.TextMessageRequest;
import yte.intern.oysbackend.messaging.service.MessageService;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    @PostMapping("/send")
    public TextMessageRequest sendMessage(@RequestBody TextMessageRequest textMessageRequest) {
        return messageService.sendMessage(textMessageRequest);
    }

    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload TextMessageRequest textMessageRequest) {

    }

    @SendTo("/topic/message")
    public TextMessageRequest broadcastMessage(@Payload TextMessageRequest textMessageRequest) {
        return textMessageRequest;
    }

    @PostMapping("/sendToUser")
    @MessageMapping("/private-message")
    public OutputMessage recMessage(@Payload @RequestBody TextMessageRequest message){
        return messageService.recMessage(message);
    }

}
