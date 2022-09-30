package yte.intern.oysbackend.assistant.entity.dto;

public record AssistantScheduleResponse(
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
