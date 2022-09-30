package yte.intern.oysbackend.student.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.assignment.entity.homework.Homework;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.course.entity.dto.CourseResponse;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.repository.CourseRepository;
import yte.intern.oysbackend.student.entity.dto.DateResponse;
import yte.intern.oysbackend.student.entity.dto.StudentScheduleRequest;
import yte.intern.oysbackend.student.entity.dto.StudentScheduleResponse;
import yte.intern.oysbackend.student.entity.Student;
import yte.intern.oysbackend.student.entity.StudentSchedule;
import yte.intern.oysbackend.student.entity.StudentScheduleId;
import yte.intern.oysbackend.student.repository.StudentRepository;
import yte.intern.oysbackend.student.repository.StudentScheduleRepository;
import yte.intern.oysbackend.user.repository.UserProfileRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserProfileRepository userProfileRepository;
    private final StudentScheduleRepository studentScheduleRepository;
    private final CourseRepository courseRepository;
    public MessageResponse attendCourse(String courseCode, String username) {
        Student existingStudent = studentRepository.findByUsername(username);
        Course attendedCourse = courseRepository.findByCourseCode(courseCode).get(0);
        existingStudent.attend(attendedCourse);
        attendedCourse.addStudent(existingStudent);
        studentRepository.save(existingStudent);
        courseRepository.save(attendedCourse);
        return new MessageResponse("Ders kayıt işlemi başarılı.", ResponseType.SUCCESS);
    }

    public List<CourseResponse> getCourses(String username) {
        return studentRepository.findByUsername(username).getCourses()
                .stream()
                .map((e) -> new CourseResponse(
                        e.getCourseCode(),
                        e.getName(),
                        e.getLecturer().getName(),
                        null, 0L)).toList();
    }

    public List<DateResponse> getDates(String username) {
        Student student = studentRepository.findByUsername(username);
        List<Exam> exams = new ArrayList<>();
        List<Homework> homeworks = new ArrayList<>();
        List<DateResponse> dates = new ArrayList<>();


        student.getCourses().forEach(c -> exams.addAll(c.getExams()));
        student.getCourses().forEach(c -> homeworks.addAll(c.getHomeworks()));

        exams.forEach(e -> dates.add(new DateResponse("/my_courses/" + e.getCourse().getCourseCode().toLowerCase() + "/exam/" + e.getId(),
                e.getName(),e.getDate().toLocalDate())));
        homeworks.forEach(h -> dates.add(new DateResponse("/my_courses/" + h.getCourse().getCourseCode().toLowerCase() + "/hw/" + h.getId(),
                "Ödev" + h.getId(),
                h.getLastSubmissionDate().toLocalDate())));

        return dates;
    }

    public List<StudentScheduleResponse> getSchedule(String username) {
        Student student = studentRepository.findByUsername(username);
        return student.getSchedule()
                .stream()
                .map(s -> new StudentScheduleResponse(
                        s.getDetail(),
                        s.getStudentScheduleId().getDayOfWeek(),
                        s.getStudentScheduleId().getHour()
                ))
                .toList();
    }

    public MessageResponse updateSchedule(StudentScheduleRequest studentScheduleRequest, String username) {
        Student student = studentRepository.findByUsername(username);
        student.getSchedule().add(
                new StudentSchedule(
                        new StudentScheduleId(
                                studentScheduleRequest.dayOfWeek(),
                                studentScheduleRequest.hour(),
                                student.getId()
                        ),
                        student,
                        studentScheduleRequest.detail()
                )
        );

        studentRepository.save(student);

        return new MessageResponse("Aktivite başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public MessageResponse deleteSchedule(StudentScheduleRequest studentScheduleRequest, String username) {
        Student student = studentRepository.findByUsername(username);
        StudentSchedule studentSchedule = student.getSchedule().stream().filter(
                s -> (s.getStudentScheduleId().getDayOfWeek().equals(studentScheduleRequest.dayOfWeek())
                    && (s.getStudentScheduleId().getHour().equals(studentScheduleRequest.hour()))
                )
        ).findFirst().get();

        student.getSchedule().remove(studentSchedule);

        studentScheduleRepository.delete(studentSchedule);

        studentRepository.save(student);

        return new MessageResponse("Aktivite başarıyla silindi.", ResponseType.SUCCESS);
    }
}
