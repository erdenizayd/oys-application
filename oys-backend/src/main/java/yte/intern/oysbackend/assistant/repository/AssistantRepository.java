package yte.intern.oysbackend.assistant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assistant.entity.Assistant;

public interface AssistantRepository extends JpaRepository<Assistant, Long> {
    Assistant findByName(String assistantName);

    Assistant findByUsername(String username);
}
