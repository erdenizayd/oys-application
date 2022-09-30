package yte.intern.oysbackend.assistant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assistant.entity.AssistantSchedule;
import yte.intern.oysbackend.assistant.entity.AssistantScheduleId;

public interface AssistantScheduleRepository extends JpaRepository<AssistantSchedule, AssistantScheduleId> {
}
