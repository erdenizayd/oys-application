package yte.intern.oysbackend.assignment.entity.exam;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.room.entity.Room;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Exam extends BaseEntity {
    protected String name;
    protected LocalDateTime date;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    protected Course course;
    @ManyToOne
    protected Room room;
    protected String details;

    private Boolean isGraded = false;

    @OneToMany(mappedBy = "exam", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<ExamGrade> examGrades;

    public Exam(String name, LocalDateTime dateTime, Course course, Room room, String details) {
        this.name = name;
        this.date = dateTime;
        this.course = course;
        this.room = room;
        this.details = details;
    }

    public void addGrade(ExamGrade examGrade) {
        this.examGrades.add(examGrade);
        this.isGraded = true;
    }
}
