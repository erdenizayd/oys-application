package yte.intern.oysbackend.assignment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.assignment.entity.exam.dto.EvaluationRequest;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamGradeResponse;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamRequest;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamResponse;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.assignment.entity.exam.ExamGrade;
import yte.intern.oysbackend.assignment.repository.ExamGradeRepository;
import yte.intern.oysbackend.assignment.repository.ExamRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.repository.CourseRepository;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.room.repository.RoomRepository;
import yte.intern.oysbackend.student.entity.Student;
import yte.intern.oysbackend.student.repository.StudentRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final RoomRepository roomRepository;
    private final CourseRepository courseRepository;
    private final ExamGradeRepository examGradeRepository;
    private final StudentRepository studentRepository;
    public MessageResponse addExam(ExamRequest examRequest) {
        Course course = courseRepository.findByCourseCode(examRequest.courseCode()).get(0);
        Room room = roomRepository.findRoomByName(examRequest.roomName());
        LocalDateTime dateTime = LocalDateTime.of(examRequest.date(),examRequest.time());
        Exam newExam = new Exam(examRequest.name(), dateTime, course, room, examRequest.details());
        MessageResponse response;
        if(examRepository.existsByDate(dateTime)) {
            if(examRepository.existsByDateAndRoom(dateTime,room)) {
                response = new MessageResponse("Sınıf girdiğiniz tarih ve saatte dolu.", ResponseType.ERROR);
                return response;
            }
            response = new MessageResponse("Girdiğiniz tarih ve saatte başka bir sınav daha bulunuyor.", ResponseType.WARNING);

        }
        else {
            response = new MessageResponse("Sınav başarıyla eklendi.", ResponseType.SUCCESS);
        }

        course.addExam(newExam);
        room.addExam(newExam);

        courseRepository.save(course);
        roomRepository.save(room);
        examRepository.save(newExam);

        return response;

    }

    public ExamResponse getExam(Long examId) {
        return ExamResponse.fromExam(examRepository.getById(examId));
    }

    public MessageResponse evaluateExam(Long examId, Long studentId, EvaluationRequest evaluationRequest) {
        Student student = studentRepository.findById(studentId).get();
        Exam exam = examRepository.findById(examId).get();
        ExamGrade examGrade = new ExamGrade(student, evaluationRequest.grade(), evaluationRequest.evaluation(),exam);

        exam.addGrade(examGrade);
        student.addGrade(examGrade);

        examGradeRepository.save(examGrade);
        studentRepository.save(student);
        examRepository.save(exam);

        return new MessageResponse("Öğrencinin sınavı başarıyla notlandırıldı.", ResponseType.SUCCESS);
    }

    public List<Long> getExamGrades(Long examId) {
        return examRepository.findById(examId).get()
                .getExamGrades()
                .stream()
                .map(ExamGrade::getGrade)
                .toList();
    }

    public ExamGradeResponse getExamGrade(Long examId, String username) {
        Student student = studentRepository.findByUsername(username);

        return student.getGrades()
                .stream()
                .filter((g) -> g.getExam().getId().equals(examId))
                .map(g -> new ExamGradeResponse(g.getExam().getId(), g.getGrade(),g.getEvaluation()))
                .toList()
                .get(0);
    }
}
