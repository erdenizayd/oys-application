package yte.intern.oysbackend.course.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.assignment.entity.homework.Homework;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.course.entity.CourseSource.CourseSource;
import yte.intern.oysbackend.lecturer.entity.Lecturer;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.student.entity.Student;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course extends BaseEntity {
    private String courseCode;
    private String name;
    private CourseType courseType;

    private String about;
    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<CourseHour> hours = new HashSet<>();

    @ManyToOne
    private Room room;

    public Course(String courseCode, String name, String about, CourseType courseType, Set<CourseHour> hours, Lecturer lecturer, Room room) {
        this.courseCode = courseCode;
        this.name = name;
        this.about = about;
        this.courseType = courseType;
        this.hours = hours;
        this.lecturer = lecturer;
        this.room = room;
    }

    @ManyToOne
    private Lecturer lecturer;

    @ManyToMany
    @JoinTable(name = "course_students",
            joinColumns = @JoinColumn(name = "course_course_code"))
    private Set<Student> students = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<CourseAnnouncements> announcements;

    @ManyToMany
    @JoinTable(name = "course_assistants",
            joinColumns = @JoinColumn(name = "course_course_code"))
    private Set<Assistant> assistants = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Exam> exams;

    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Homework> homeworks;

    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<CourseSource> courseSources;

    public Course(Long id, String code, String name, String about, CourseType courseType, Set<CourseHour> courseHours, Lecturer lecturer, Room room) {
        this.id = id;
        this.courseCode = code;
        this.name = name;
        this.about = about;
        this.courseType = courseType;
        this.hours = courseHours;
        this.lecturer = lecturer;
        this.room = room;
    }

    public void update(Course course) {
        this.hours.clear();
        this.hours.addAll(course.getHours());
        this.courseCode = course.getCourseCode();
        this.name = course.getName();
        this.about = course.getAbout();
        this.courseType = course.getCourseType();
        this.room = course.getRoom();
        this.lecturer = course.getLecturer();
    }

    public void addStudent(Student student) {
        students.add(student);
    }

    public void addAssistant(Assistant assistant) {
        assistants.add(assistant);
    }

    public void addExam(Exam newExam) {
        exams.add(newExam);
    }

    public void addHomework(Homework homework) {
        homeworks.add(homework);
    }

}
