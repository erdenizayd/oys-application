package yte.intern.oysbackend.course.entity;

import lombok.*;
import yte.intern.oysbackend.room.entity.Room;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseHour {


    public CourseHour(CourseHourId courseHourId, Room room) {
        this.courseHourId = courseHourId;
        this.room = room;
    }

    @EmbeddedId
    private CourseHourId courseHourId;
    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;
}
