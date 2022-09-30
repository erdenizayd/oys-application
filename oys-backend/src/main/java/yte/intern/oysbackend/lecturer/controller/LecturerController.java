package yte.intern.oysbackend.lecturer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.lecturer.entity.dto.LecturerScheduleRequest;
import yte.intern.oysbackend.lecturer.entity.dto.LecturerScheduleResponse;
import yte.intern.oysbackend.lecturer.service.LecturerService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LecturerController {
    private final LecturerService lecturerService;

    @GetMapping("/lecturers")
    public List<String> getLecturers() {
        return lecturerService.getLecturers();
    }

    @GetMapping("/getSchedule/lecturer/{username}")
    public List<LecturerScheduleResponse> getSchedule(@PathVariable String username) {
        return lecturerService.getSchedule(username);
    }

    @PostMapping("/updateSchedule/lecturer/{username}")
    public MessageResponse updateSchedule(@RequestBody LecturerScheduleRequest lecturerScheduleRequest, @PathVariable String username) {
        return lecturerService.updateSchedule(lecturerScheduleRequest, username);
    }

    @PutMapping("/deleteSchedule/lecturer/{username}")
    public MessageResponse deleteSchedule(@RequestBody LecturerScheduleRequest lecturerScheduleRequest, @PathVariable String username) {
        return lecturerService.deleteSchedule(lecturerScheduleRequest,username);
    }
}
