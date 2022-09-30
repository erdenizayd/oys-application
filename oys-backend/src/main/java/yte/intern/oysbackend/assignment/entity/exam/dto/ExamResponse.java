package yte.intern.oysbackend.assignment.entity.exam.dto;

import yte.intern.oysbackend.assignment.entity.exam.Exam;

import java.time.LocalDateTime;

public record ExamResponse (
        Long id,
        String name,
        String date,
        String roomName,
        String details,
        Boolean isGraded
) {
    public static ExamResponse fromExam(Exam exam) {
        LocalDateTime date = exam.getDate();
        String returnDate = date.getDayOfMonth() + "." + date.getMonthValue() + "." + date.getYear() + " Saat: " + date.getHour() + "." + date.getMinute();
        return new ExamResponse(
                exam.getId(),
                exam.getName(),
                returnDate,
                exam.getRoom().getName(),
                exam.getDetails(),
                exam.getIsGraded()
        );
    }
}
