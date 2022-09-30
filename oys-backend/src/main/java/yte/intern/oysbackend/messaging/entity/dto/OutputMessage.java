package yte.intern.oysbackend.messaging.entity.dto;

import java.time.LocalDateTime;

public record OutputMessage (
        String from,
        String text,
        LocalDateTime dateTime
){
    public static OutputMessage fromTextMessage(TextMessageRequest textMessageRequest) {
        return new OutputMessage(
                textMessageRequest.from(),
                textMessageRequest.text(),
                LocalDateTime.now()
        );
    }
}
