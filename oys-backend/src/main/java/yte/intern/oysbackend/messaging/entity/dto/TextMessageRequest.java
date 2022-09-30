package yte.intern.oysbackend.messaging.entity.dto;

public record TextMessageRequest(
        String to,
        String from,
        String text
) {
}
