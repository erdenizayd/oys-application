package yte.intern.oysbackend.assistant.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.oysbackend.assistant.entity.dto.AssistantResponse;
import yte.intern.oysbackend.assistant.entity.dto.AssistantScheduleRequest;
import yte.intern.oysbackend.assistant.entity.dto.AssistantScheduleResponse;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.assistant.entity.AssistantSchedule;
import yte.intern.oysbackend.assistant.entity.AssistantScheduleId;
import yte.intern.oysbackend.assistant.repository.AssistantRepository;
import yte.intern.oysbackend.assistant.repository.AssistantScheduleRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class AssistantService {
    private final AssistantRepository assistantRepository;
    private final AssistantScheduleRepository assistantScheduleRepository;

    public List<AssistantResponse> getAssistants() {
        return assistantRepository.findAll().stream().map(AssistantResponse::fromAssistant).toList();
    }

    public List<AssistantScheduleResponse> getSchedule(String username) {
        Assistant assistant = assistantRepository.findByUsername(username);
        return assistant.getSchedule()
                .stream()
                .map(a -> new AssistantScheduleResponse(
                        a.getDetail(),
                        a.getAssistantScheduleId().getDayOfWeek(),
                        a.getAssistantScheduleId().getHour())
                )
                .toList();
    }

    public MessageResponse updateSchedule(AssistantScheduleRequest assistantScheduleRequest, String username) {
        Assistant assistant = assistantRepository.findByUsername(username);
        assistant.getSchedule().add(
                new AssistantSchedule(
                        new AssistantScheduleId(
                                assistantScheduleRequest.dayOfWeek(),
                                assistantScheduleRequest.hour(),
                                assistant.getId()
                        ),
                        assistantScheduleRequest.detail(),
                        assistant
                )
        );

        assistantRepository.save(assistant);

        return new MessageResponse("Aktivite başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public MessageResponse deleteSchedule(AssistantScheduleRequest assistantScheduleRequest, String username) {
        Assistant assistant = assistantRepository.findByUsername(username);
        AssistantSchedule assistantSchedule = assistant.getSchedule().stream().filter(s -> (
                s.getAssistantScheduleId().getDayOfWeek().equals(assistantScheduleRequest.dayOfWeek())
                        && s.getAssistantScheduleId().getHour().equals(assistantScheduleRequest.hour())
        )).findFirst().get();

        assistant.getSchedule().remove(assistantSchedule);

        assistantScheduleRepository.delete(assistantSchedule);

        assistantRepository.save(assistant);
        return new MessageResponse("Aktivite başarıyla silindi.", ResponseType.SUCCESS);
    }
}
