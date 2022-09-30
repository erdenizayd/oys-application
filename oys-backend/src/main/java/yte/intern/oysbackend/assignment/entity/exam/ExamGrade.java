package yte.intern.oysbackend.assignment.entity.exam;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.student.entity.Student;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity(name = "exam_grade")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExamGrade extends BaseEntity {
    @ManyToOne
    protected Student student;
    protected Long grade;
    protected String evaluation;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Exam exam;
}
