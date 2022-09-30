package yte.intern.oysbackend.assistant.entity.dto;

public record AssistantScheduleRequest(
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
