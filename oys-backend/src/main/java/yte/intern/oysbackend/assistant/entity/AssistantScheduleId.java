package yte.intern.oysbackend.assistant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AssistantScheduleId implements Serializable {
    private Integer dayOfWeek;
    private Integer hour;

    private Long assistantKeyId;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AssistantScheduleId that = (AssistantScheduleId) o;
        return Objects.equals(dayOfWeek, that.dayOfWeek) && Objects.equals(hour, that.hour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dayOfWeek, hour);
    }
}
