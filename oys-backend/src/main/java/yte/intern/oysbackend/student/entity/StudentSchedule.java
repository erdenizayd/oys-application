package yte.intern.oysbackend.student.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.course.entity.Course;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
public class StudentSchedule {
    @EmbeddedId
    private StudentScheduleId studentScheduleId;

    public StudentSchedule(StudentScheduleId studentScheduleId, Student student, String detail) {
        this.studentScheduleId = studentScheduleId;
        this.student = student;
        this.detail = detail;
    }

    @ManyToOne
    @JoinColumn(name="studentId")
    private Student student;

    private String detail;

}
