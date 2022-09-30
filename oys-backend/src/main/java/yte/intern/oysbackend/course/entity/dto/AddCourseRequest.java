package yte.intern.oysbackend.course.entity.dto;

import org.springframework.data.util.Pair;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.entity.CourseHour;
import yte.intern.oysbackend.course.entity.CourseHourId;
import yte.intern.oysbackend.lecturer.entity.Lecturer;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.room.repository.RoomRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public record AddCourseRequest(String name,
                               String about,
                               String type,
                               String code,
                               List<Pair<Integer, Integer>> courseHourList,
                               String roomName,
                               String lecturerName
) {
}
