package yte.intern.oysbackend.course.entity.dto;

import org.springframework.data.util.Pair;
import yte.intern.oysbackend.course.entity.CourseHour;

import java.util.List;

public record DetailedUpdateRequest (
        String name,
        String about,
        String type,
        String code,
        String roomName,
        String lecturerName,
        List<Pair<Integer, Integer>> hours
){
}
