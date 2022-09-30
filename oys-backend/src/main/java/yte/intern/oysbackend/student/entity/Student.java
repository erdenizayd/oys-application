package yte.intern.oysbackend.student.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.assignment.entity.exam.ExamGrade;
import yte.intern.oysbackend.assignment.entity.homework.Submission;
import yte.intern.oysbackend.course.entity.CourseHour;
import yte.intern.oysbackend.user.entity.Role;
import yte.intern.oysbackend.user.entity.UserProfile;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("student")
public class Student extends UserProfile {
    public Student(String username, String name, Role role, String primaryEmail) {
        super(username, name, role, primaryEmail);
    }

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    protected Set<StudentSchedule> schedule;
    @ManyToMany(mappedBy = "students", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    protected Set<Course> courses;
    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    protected Set<Submission> submissions;
    @OneToMany(mappedBy = "student" , fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    protected Set<ExamGrade> grades;

    public void attend(Course course) {
        schedule.addAll(course.getHours().stream().map((e) -> (new StudentSchedule(
                new StudentScheduleId(
                        e.getCourseHourId().getDayOfWeek(),
                        e.getCourseHourId().getHour(),
                        this.getId()
                ),this, course.getCourseCode()))).toList());

        courses.add(course);

    }

    public void addSubmission(Submission submission) {
        submissions.add(submission);
    }

    public void addGrade(ExamGrade examGrade) {
        grades.add(examGrade);
    }

    public void deleteCourse(Course course) {
        courses.removeIf(c -> c.getId().equals(course.getId()));
    }

    public void deleteHours(Course course) {
        for (CourseHour hour: course.getHours()) {
            schedule.removeIf((s) -> (s.getStudentScheduleId().getHour().equals(hour.getCourseHourId().getHour()) &&
                        s.getStudentScheduleId().getDayOfWeek().equals(hour.getCourseHourId().getDayOfWeek())));
        }
    }
}
