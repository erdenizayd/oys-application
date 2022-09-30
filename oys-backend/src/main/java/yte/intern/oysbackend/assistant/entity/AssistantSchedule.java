package yte.intern.oysbackend.assistant.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import yte.intern.oysbackend.course.entity.Course;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssistantSchedule {
    @EmbeddedId
    private AssistantScheduleId assistantScheduleId;

    private String detail;
    @ManyToOne
    @JoinColumn(name = "assistantId")
    Assistant assistant;
}
