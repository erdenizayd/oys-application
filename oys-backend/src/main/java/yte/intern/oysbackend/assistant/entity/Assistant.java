package yte.intern.oysbackend.assistant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.assignment.entity.homework.Homework;
import yte.intern.oysbackend.course.entity.CourseHour;
import yte.intern.oysbackend.user.entity.Role;
import yte.intern.oysbackend.user.entity.UserProfile;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("assistant")
public class Assistant extends UserProfile {
    public Assistant(String username, String name, Role role, String primaryEmail) {
        super(username, name, role, primaryEmail);
    }

    @OneToMany(mappedBy = "assistant", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    protected Set<AssistantSchedule> schedule;

    @ManyToMany(mappedBy = "assistants", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    protected Set<Course> courses;

    @OneToMany(mappedBy = "assistant", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    protected Set<Homework> homeworks;

    public void addCourse(Course course) {
        schedule.addAll(course.getHours().stream().map((e) -> (new AssistantSchedule(
                new AssistantScheduleId(
                        e.getCourseHourId().getDayOfWeek(),
                        e.getCourseHourId().getHour(),
                        this.getId()
                ),course.getCourseCode(),this))).toList());

        courses.add(course);

    }

    public void addHomework(Homework homework) {
        homeworks.add(homework);
    }

    public void deleteCourse(Course course) {
        courses.removeIf(c -> c.getId().equals(course.getId()));
    }

    public void deleteHours(Course course) {
        for (CourseHour hour: course.getHours()) {
            schedule.forEach((s) -> {
                if(s.getAssistantScheduleId().getHour().equals(hour.getCourseHourId().getHour()) &&
                        s.getAssistantScheduleId().getDayOfWeek().equals(hour.getCourseHourId().getDayOfWeek())) {
                    schedule.remove(s);
                }
            });
        }
    }
}
