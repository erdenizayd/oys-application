package yte.intern.oysbackend.course.entity.dto;

import org.springframework.data.util.Pair;

import java.util.List;

public record UpdateCourseRequest(String name,
                                  String about,
                                  String type,
                                  String code,
                                  String roomName,
                                  String lecturerName) {
}
