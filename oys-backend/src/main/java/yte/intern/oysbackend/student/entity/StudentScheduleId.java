package yte.intern.oysbackend.student.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.course.entity.CourseHourId;

import java.io.Serializable;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentScheduleId implements Serializable {
    private Integer dayOfWeek;
    private Integer hour;

    private Long studentKeyId;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudentScheduleId that = (StudentScheduleId) o;
        return dayOfWeek == that.getDayOfWeek() && hour.equals(that.getHour());
    }

    @Override
    public int hashCode() {
        return Objects.hash(dayOfWeek, hour);
    }
}
