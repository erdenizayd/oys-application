package yte.intern.oysbackend.assignment.entity.homework.dto;

import yte.intern.oysbackend.assignment.entity.homework.Homework;

import java.time.LocalDateTime;

public record HomeworkResponse(
        Long id,
        String lastDate,
        String assistantName,
        Boolean isGraded
) {
    public static HomeworkResponse fromHomework(Homework homework) {
        LocalDateTime date = homework.getLastSubmissionDate();
        String returnDate = date.getDayOfMonth() + "." + date.getMonthValue() + "." + date.getYear() + " Saat: " + date.getHour() + "." + date.getMinute();
        return new HomeworkResponse(
                homework.getId(),
                returnDate,
                homework.getAssistant().getName(),
                homework.getIsGraded()
        );
    }
}
