package yte.intern.oysbackend.assignment.entity.homework;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.course.entity.Course;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class Homework extends BaseEntity {

    @Lob
    protected byte[] detail;
    protected LocalDateTime lastSubmissionDate;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    protected Course course;
    @ManyToOne
    protected Assistant assistant;

    private Boolean isGraded = false;


    @OneToMany(mappedBy = "homework", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Submission> submissions;

    public Homework(byte[] bytes, LocalDateTime localDateTime, Course course, Assistant assistant) {
        this.detail = bytes;
        this.lastSubmissionDate = localDateTime;
        this.course = course;
        this.assistant = assistant;
    }

    public void addSubmission(Submission submission) {
        submissions.add(submission);
    }

    public void graded() {
        this.isGraded = true;
    }
}
