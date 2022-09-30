package yte.intern.oysbackend.assignment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.assignment.entity.exam.dto.EvaluationRequest;
import yte.intern.oysbackend.assignment.entity.homework.Homework;
import yte.intern.oysbackend.assignment.entity.homework.Submission;
import yte.intern.oysbackend.assignment.entity.homework.dto.*;
import yte.intern.oysbackend.assignment.repository.HomeworkRepository;
import yte.intern.oysbackend.assignment.repository.SubmissionRepository;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.assistant.repository.AssistantRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.repository.CourseRepository;
import yte.intern.oysbackend.student.entity.Student;
import yte.intern.oysbackend.student.repository.StudentRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class HomeworkService {
    private final HomeworkRepository homeworkRepository;
    private final CourseRepository courseRepository;
    private final AssistantRepository assistantRepository;
    private final StudentRepository studentRepository;

    private final SubmissionRepository submissionRepository;
    public MessageResponse addHomework(MultipartFile file, HomeworkRequest homeworkRequest) throws IOException {
        Course course = courseRepository.findByCourseCode(homeworkRequest.courseCode()).get(0);
        Assistant assistant = assistantRepository.findByName(homeworkRequest.assistantName());
        LocalDateTime localDateTime = LocalDateTime.of(homeworkRequest.date(),homeworkRequest.time());
        Homework homework = new Homework(file.getBytes(),localDateTime, course, assistant);

        assistant.addHomework(homework);
        course.addHomework(homework);

        homeworkRepository.save(homework);
        assistantRepository.save(assistant);
        courseRepository.save(course);

        return new MessageResponse("Ödev başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public byte[] getHomeworkDetails(Long homeworkId) {
        return homeworkRepository.getById(homeworkId).getDetail();
    }

    public HomeworkResponse getHomework(Long homeworkId) {
        return HomeworkResponse.fromHomework(homeworkRepository.getById(homeworkId));
    }

    public MessageResponse submitHomework(MultipartFile file, SubmissionRequest submissionRequest) throws IOException {
        Homework homework = homeworkRepository.findById(submissionRequest.homeworkId()).get();
        Student student = studentRepository.findByUsername(submissionRequest.username());

        Submission submission = new Submission(file.getBytes(), submissionRequest.details(),student, homework);

        homework.addSubmission(submission);
        student.addSubmission(submission);

        submissionRepository.save(submission);
        homeworkRepository.save(homework);
        studentRepository.save(student);

        return new MessageResponse("Ödev teslimi başarılı.", ResponseType.SUCCESS);

    }

    public List<SubmissionResponse> getSubmission(Long homeworkId, String username) {
        Student student = studentRepository.findByUsername(username);
        boolean isExists = submissionRepository.existsByStudentId(student.getId());

        if(isExists) {
            return new ArrayList<>(
                    student.getSubmissions()
                            .stream()
                            .filter((s) -> s.getHomework().getId().equals(homeworkId))
                            .map((s) -> new SubmissionResponse(s.getId(), s.getDetails()))
                            .toList()
            );
        }
        else {
            return new ArrayList<>();
        }
    }

    public byte[] getSubmissionFile(Long homeworkId, Long submissionId) {
        return submissionRepository.getReferenceById(submissionId).getSubmission();
    }

    public MessageResponse evaluateHomework(Long homeworkId, Long studentId, EvaluationRequest evaluationRequest) {
        Homework homework = homeworkRepository.findById(homeworkId).get();
        Student student = studentRepository.findById(studentId).get();
        List<Submission> submissions = homework.getSubmissions()
                .stream()
                .filter(s -> s.getStudent().getId().equals(studentId))
                .toList();

        submissions.forEach(submission -> {submission.evaluate(evaluationRequest.evaluation(),evaluationRequest.grade());});
        homework.graded();

        submissionRepository.saveAll(submissions);
        homeworkRepository.save(homework);
        studentRepository.save(student);

        return new MessageResponse("Öğrencinin ödevi başarıyla notlandırıldı.", ResponseType.SUCCESS);

    }

    public List<Long> getHomeworkGrades(Long homeworkId) {
        return homeworkRepository.findById(homeworkId)
                .get()
                .getSubmissions()
                .stream()
                .map(Submission::getGrade)
                .toList();
    }

    public SubmissionGradeResponse getHomeworkGrade(Long homeworkId, String username) {
        Student student = studentRepository.findByUsername(username);

        return student.getSubmissions()
                .stream()
                .filter((s) -> s.getHomework().getId().equals(homeworkId))
                .map((s) -> new SubmissionGradeResponse(s.getHomework().getId(),s.getGrade(), s.getEvaluation()))
                .toList()
                .get(0);

    }
}
