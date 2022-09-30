package yte.intern.oysbackend.lecturer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;
import yte.intern.oysbackend.course.entity.Course;
import yte.intern.oysbackend.course.entity.CourseHour;
import yte.intern.oysbackend.user.entity.Role;
import yte.intern.oysbackend.user.entity.UserProfile;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Lecturer extends UserProfile {

    public Lecturer(String username, String name, Role role, String primaryEmail) {
        super(username, name, role, primaryEmail);
    }

    @OneToMany(mappedBy = "lecturer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    protected Set<LecturerSchedule> schedule;

    @OneToMany(mappedBy = "lecturer")
    protected Set<Course> courses;

    public Boolean isAvailable(List<Pair<Integer, Integer>> courseHourList) {
        if(schedule.size() == 0) return true;

        for(Pair<Integer,Integer> e : courseHourList) {
            for(LecturerSchedule s : schedule) {
                if ((e.getFirst().equals(s.getLecturerScheduleId().getDayOfWeek())) && (e.getSecond().equals(s.getLecturerScheduleId().getHour()))) {
                    return false;
                }
            }
        }
        return true;
    }
    public void addCourse(Course course,List<Pair<Integer, Integer>> courseHourList) {
        schedule.addAll(courseHourList.stream().map((e) -> new LecturerSchedule(
                new LecturerScheduleId(e.getFirst(), e.getSecond(),this.id),
                this, course.getCourseCode())).toList());

    }

    public void deleteCourse(Course course) {
        courses.removeIf(c -> c.getId().equals(course.getId()));
    }

    public void deleteHours(Course course) {
        for (CourseHour hour: course.getHours()) {
            schedule.forEach((s) -> {
                if(s.getLecturerScheduleId().getHour().equals(hour.getCourseHourId().getHour()) &&
                        s.getLecturerScheduleId().getDayOfWeek().equals(hour.getCourseHourId().getDayOfWeek())) {
                    schedule.remove(s);

                }
            });
        }
    }
}
