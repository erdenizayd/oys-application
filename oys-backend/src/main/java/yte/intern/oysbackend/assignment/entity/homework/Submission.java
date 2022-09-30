package yte.intern.oysbackend.assignment.entity.homework;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.assignment.entity.homework.Homework;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.student.entity.Student;

import javax.persistence.*;

@Entity(name = "submissions")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Submission extends BaseEntity {
    @Lob
    protected byte[] submission;
    protected String details;
    protected Long grade;

    protected boolean isSubmitted = false;

    @ManyToOne
    protected Student student;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Homework homework;

    protected String evaluation;

    public Submission(byte[] file, String details, Student student, Homework homework) {
        this.submission = file;
        this.details = details;
        this.student = student;
        this.homework = homework;
        this.evaluation = "";
        this.grade = -1L;
        this.isSubmitted = true;
    }

    public void evaluate(String evaluation, Long grade) {
        this.evaluation = evaluation;
        this.grade = grade;
    }
}
