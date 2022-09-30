package yte.intern.oysbackend.lecturer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.lecturer.entity.dto.LecturerScheduleRequest;
import yte.intern.oysbackend.lecturer.entity.dto.LecturerScheduleResponse;
import yte.intern.oysbackend.lecturer.entity.Lecturer;
import yte.intern.oysbackend.lecturer.entity.LecturerSchedule;
import yte.intern.oysbackend.lecturer.entity.LecturerScheduleId;
import yte.intern.oysbackend.lecturer.repository.LecturerRepository;
import yte.intern.oysbackend.lecturer.repository.LecturerScheduleRepository;
import yte.intern.oysbackend.user.entity.UserProfile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class LecturerService {
    private final LecturerRepository lecturerRepository;
    private final LecturerScheduleRepository lecturerScheduleRepository;
    public List<String> getLecturers() {
        return lecturerRepository.findAll().stream().map(UserProfile::getName).toList();
    }

    public List<LecturerScheduleResponse> getSchedule(String username) {
        Lecturer lecturer = lecturerRepository.findByUsername(username);
        return lecturer.getSchedule()
                .stream()
                .map(l -> new LecturerScheduleResponse(
                        l.getDetail(),
                        l.getLecturerScheduleId().getDayOfWeek(),
                        l.getLecturerScheduleId().getHour()
                ))
                .toList();
    }

    public MessageResponse updateSchedule(LecturerScheduleRequest lecturerScheduleRequest, String username) {
        Lecturer lecturer = lecturerRepository.findByUsername(username);
        lecturer.getSchedule()
                .add(new LecturerSchedule
                        (new LecturerScheduleId(
                                lecturerScheduleRequest.dayOfWeek(),
                                lecturerScheduleRequest.hour(),
                                lecturer.getId()
                        ),
                                lecturer,
                                lecturerScheduleRequest.detail())
                );

        lecturerRepository.save(lecturer);

        return new MessageResponse("Aktivite başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public MessageResponse deleteSchedule(LecturerScheduleRequest lecturerScheduleRequest, String username) {
        Lecturer lecturer = lecturerRepository.findByUsername(username);
        LecturerSchedule lecturerSchedule = lecturer.getSchedule().stream().filter(s -> s.getLecturerScheduleId().getDayOfWeek().equals(lecturerScheduleRequest.dayOfWeek()) &&
                s.getLecturerScheduleId().getHour().equals(lecturerScheduleRequest.hour())
        ).findFirst().get();

        lecturer.getSchedule().remove(lecturerSchedule);
        lecturerScheduleRepository.delete(lecturerSchedule);

        lecturerRepository.save(lecturer);

        return new MessageResponse("Aktivite başarıyla silindi.", ResponseType.SUCCESS);
    }
}
