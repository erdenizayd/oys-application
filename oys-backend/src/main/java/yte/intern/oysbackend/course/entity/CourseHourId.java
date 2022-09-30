package yte.intern.oysbackend.course.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.DayOfWeek;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseHourId implements Serializable {
    private Integer dayOfWeek;
    private Integer hour;

    private Long courseRoomId;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseHourId that = (CourseHourId) o;
        return dayOfWeek == that.dayOfWeek && hour.equals(that.hour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dayOfWeek, hour);
    }
}
