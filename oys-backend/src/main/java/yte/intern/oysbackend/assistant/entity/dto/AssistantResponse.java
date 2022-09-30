package yte.intern.oysbackend.assistant.entity.dto;

import yte.intern.oysbackend.assistant.entity.Assistant;

public record AssistantResponse(
        Long id,
        String name
) {
    public static AssistantResponse fromAssistant(Assistant assistant) {
        return new AssistantResponse(assistant.getId(), assistant.getName());
    }
}
