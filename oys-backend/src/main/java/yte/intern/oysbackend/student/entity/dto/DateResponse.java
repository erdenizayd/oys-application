package yte.intern.oysbackend.student.entity.dto;

import java.time.LocalDate;

public record DateResponse(
        String address,
        String name,
        LocalDate date
) {
}
