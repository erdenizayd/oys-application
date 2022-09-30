package yte.intern.oysbackend.assistant.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.assistant.entity.dto.AssistantResponse;
import yte.intern.oysbackend.assistant.entity.dto.AssistantScheduleRequest;
import yte.intern.oysbackend.assistant.entity.dto.AssistantScheduleResponse;
import yte.intern.oysbackend.assistant.service.AssistantService;
import yte.intern.oysbackend.common.response.MessageResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AssistantController {

    private final AssistantService assistantService;

    @GetMapping("/getAssistants")
    public List<AssistantResponse> getAssistants() {
        return assistantService.getAssistants();
    }

    @GetMapping("/getSchedule/assistant/{username}")
    public List<AssistantScheduleResponse> getSchedule(@PathVariable String username) {
        return assistantService.getSchedule(username);
    }

    @PostMapping("/updateSchedule/assistant/{username}")
    public MessageResponse updateSchedule(@RequestBody AssistantScheduleRequest assistantScheduleRequest, @PathVariable String username) {
        return assistantService.updateSchedule(assistantScheduleRequest, username);
    }

    @PutMapping("/deleteSchedule/assistant/{username}")
    public MessageResponse deleteSchedule(@RequestBody AssistantScheduleRequest assistantScheduleRequest, @PathVariable String username) {
        return assistantService.deleteSchedule(assistantScheduleRequest, username);
    }

}
