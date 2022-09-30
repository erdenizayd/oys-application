package yte.intern.oysbackend.course.entity.CourseSource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.course.entity.Course;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseSource extends BaseEntity {
    private String name;
    private SourceType type;
    private String url;
    byte[] file;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Course course;

    public void setCourse(Course course) {
        this.course = course;
    }
}
