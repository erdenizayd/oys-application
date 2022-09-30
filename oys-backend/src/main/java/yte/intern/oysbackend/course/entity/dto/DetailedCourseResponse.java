package yte.intern.oysbackend.course.entity.dto;

import yte.intern.oysbackend.assignment.entity.exam.dto.ExamResponse;
import yte.intern.oysbackend.assignment.entity.homework.dto.HomeworkResponse;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.course.entity.Course;

import java.util.List;

public record DetailedCourseResponse(
    String code,
    String name,
    String lecturerName,
    String about,
    String roomName,
    String type,
    List<String> assistantNames,
    List<ExamResponse> exams,
    List<HomeworkResponse> homeworks,
    List<CourseHourResponse> courseHours,
    List<CourseAnnouncementResponse> announcements
) {
        public static DetailedCourseResponse fromCourse(Course course) {
            return new DetailedCourseResponse(
                    course.getCourseCode(),
                    course.getName(),
                    course.getLecturer().getName(),
                    course.getAbout(),
                    course.getRoom().getName(),
                    course.getCourseType().toString(),
                    course.getAssistants().stream().map(Assistant::getName).toList(),
                    course.getExams().stream().map(ExamResponse::fromExam).toList(),
                    course.getHomeworks().stream().map(HomeworkResponse::fromHomework).toList(),
                    course.getHours().stream()
                            .map((h) -> new CourseHourResponse(h.getCourseHourId().getDayOfWeek(), h.getCourseHourId().getHour(), h.getRoom().getName()))
                            .toList(),
                    course.getAnnouncements().stream().map(a -> new CourseAnnouncementResponse(a.getTitle(), a.getAnnouncement(), a.getAuthor(), a.getPostDate())).toList()
            );
        }
    }
