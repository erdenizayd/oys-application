package yte.intern.oysbackend.room.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.entity.CourseHour;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Room extends BaseEntity {
    public String name;
    private Boolean projectionExists;
    private Boolean computerExists;
    private Boolean ventilationExists;
    private Boolean windowExists;
    private Integer capacity;

    public Room(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseHour> courseHours;

    @OneToMany(mappedBy = "room")
    private Set<Exam> exams;

    @OneToMany(mappedBy = "room")
    private Set<Course> courses;

    public Room(String name, Boolean projectionExists, Boolean computerExists, Boolean ventilationExists, Boolean windowExists, Integer capacity) {
        this.name = name;
        this.projectionExists = projectionExists;
        this.computerExists = computerExists;
        this.ventilationExists = ventilationExists;
        this.windowExists = windowExists;
        this.capacity = capacity;
    }

    public void deleteHours(Course existingCourse) {
        courseHours.removeIf((c) -> c.getCourse().getId().equals(existingCourse.getId()));
    }

    public void addExam(Exam newExam) {
        exams.add(newExam);
    }

    public void deleteCourse(Course course) {
        courses.removeIf((c) -> c.getId().equals(course.getId()));
    }
}
