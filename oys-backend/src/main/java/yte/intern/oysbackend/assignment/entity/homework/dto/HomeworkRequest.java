package yte.intern.oysbackend.assignment.entity.homework.dto;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalTime;

public record HomeworkRequest(
        LocalDate date,
        LocalTime time,
        String assistantName,
        String courseCode
) {
}
