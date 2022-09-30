package yte.intern.oysbackend.lecturer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.course.entity.Course;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LecturerSchedule {
    @EmbeddedId
    private LecturerScheduleId lecturerScheduleId;

    @ManyToOne
    @JoinColumn(name="lecturerId")
    private Lecturer lecturer;

    private String detail;
}
