package yte.intern.oysbackend.assignment.entity.exam.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ExamRequest(
        String name,
        String details,
        String roomName,
        LocalDate date,
        LocalTime time,
        String courseCode
) {

}
