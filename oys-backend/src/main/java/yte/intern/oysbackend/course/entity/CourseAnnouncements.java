package yte.intern.oysbackend.course.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.common.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseAnnouncements extends BaseEntity {
    public String title;
    public String announcement;
    public String author;
    public LocalDateTime postDate;

    @ManyToOne
    public Course course;


}
