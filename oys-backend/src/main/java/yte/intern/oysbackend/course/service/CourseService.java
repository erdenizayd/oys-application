package yte.intern.oysbackend.course.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.assistant.repository.AssistantRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.course.entity.*;
import yte.intern.oysbackend.course.entity.CourseSource.CourseSource;
import yte.intern.oysbackend.course.entity.CourseSource.SourceLinkRequest;
import yte.intern.oysbackend.course.entity.CourseSource.SourceResponse;
import yte.intern.oysbackend.course.entity.CourseSource.SourceType;
import yte.intern.oysbackend.course.entity.dto.*;
import yte.intern.oysbackend.course.repository.CourseAnnouncementsRepository;
import yte.intern.oysbackend.course.repository.CourseHourRepository;
import yte.intern.oysbackend.course.repository.CourseRepository;
import yte.intern.oysbackend.course.repository.CourseSource.CourseSourceRepository;
import yte.intern.oysbackend.lecturer.entity.Lecturer;
import yte.intern.oysbackend.lecturer.repository.LecturerRepository;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.room.repository.RoomRepository;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class CourseService {
    private final CourseRepository courseRepository;
    private final RoomRepository roomRepository;
    private final LecturerRepository lecturerRepository;
    private final AssistantRepository assistantRepository;
    private final CourseHourRepository courseHourRepository;
    private final CourseSourceRepository courseSourceRepository;
    private final CourseAnnouncementsRepository courseAnnouncementsRepository;
    public MessageResponse createNewCourse(AddCourseRequest addCourseRequest) {
        Set<CourseHour> courseHours = new HashSet<>();
        Room room = roomRepository.findRoomByName(addCourseRequest.roomName());
        Lecturer lecturer = lecturerRepository.findLecturerByName(addCourseRequest.lecturerName());
        if(lecturer.isAvailable(addCourseRequest.courseHourList())){

            Course newCourse = new Course(
                    addCourseRequest.code(),
                    addCourseRequest.name(),
                    addCourseRequest.about(),
                    (addCourseRequest.type() == "ZORUNLU" ? CourseType.ZORUNLU : CourseType.SEÇMELİ),
                    null,
                    lecturer,
                    room);

            lecturer.addCourse(newCourse, addCourseRequest.courseHourList());

            for(Pair<Integer, Integer> e : addCourseRequest.courseHourList()) {
                courseHours.add(new CourseHour(new CourseHourId(e.getFirst(),e.getSecond(),room.getId()), newCourse,room));
            }

            newCourse.setHours(courseHours);

            courseRepository.save(newCourse
                );

            courseHourRepository.saveAll(courseHours);
            return new MessageResponse("Ders başarıyla oluşturuldu.", ResponseType.SUCCESS);
        }
        else return new MessageResponse("Öğretim görevlisi belirtilen saatlerde müsait değil.", ResponseType.ERROR);
    }

    public MessageResponse updateCourse(UpdateCourseRequest updateCourseRequest, String courseCode) {
        Course existingCourse = courseRepository.findByCourseCode(courseCode).get(0);
        Room room = roomRepository.findRoomByName(updateCourseRequest.roomName());
        Lecturer lecturer = lecturerRepository.findLecturerByName(updateCourseRequest.lecturerName());

        existingCourse.update(new Course(
                updateCourseRequest.code(),
                updateCourseRequest.name(),
                updateCourseRequest.about(),
                (updateCourseRequest.type() == "ZORUNLU" ? CourseType.ZORUNLU : CourseType.SEÇMELİ),
                existingCourse.getHours(),
                lecturer,
                room));

        courseRepository.save(existingCourse);

        return new MessageResponse("Ders bilgileri başarıyla güncellendi.", ResponseType.SUCCESS);
    }

    public MessageResponse updateCourseDetailed(DetailedUpdateRequest updateCourseRequest, String courseCode) {
        Course existingCourse = courseRepository.findByCourseCode(courseCode).get(0);
        Set<CourseHour> courseHours = new HashSet<>();
        Room room = roomRepository.findRoomByName(updateCourseRequest.roomName());
        Lecturer lecturer = lecturerRepository.findLecturerByName(updateCourseRequest.lecturerName());

        courseHourRepository.deleteAll(existingCourse.getHours());

        existingCourse.getRoom().deleteHours(existingCourse);

        for(Pair<Integer, Integer> e : updateCourseRequest.hours()) {
            courseHours.add(new CourseHour(new CourseHourId(e.getFirst(),e.getSecond(),room.getId()), existingCourse, room));
        }


        existingCourse.update(new Course(
                existingCourse.getId(),
                updateCourseRequest.code(),
                updateCourseRequest.name(),
                updateCourseRequest.about(),
                (updateCourseRequest.type() == "ZORUNLU" ? CourseType.ZORUNLU : CourseType.SEÇMELİ),
                courseHours,
                lecturer,
                room));

        roomRepository.save(existingCourse.getRoom());
        courseRepository.save(existingCourse);

        return new MessageResponse("Ders bilgileri başarıyla güncellendi.", ResponseType.SUCCESS);

    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course with ID %d not found".formatted(id)));
    }


    public MessageResponse deleteCourse(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode).get(0);
        Room room = roomRepository.findRoomById(course.getRoom().getId());

        room.deleteCourse(course);
        room.deleteHours(course);
        roomRepository.save(room);

        courseRepository.deleteByCourseCode(courseCode);
        return new MessageResponse("Ders başarıyla silindi.", ResponseType.SUCCESS);
    }

    public List<CourseResponse> getCourses(Integer page) {
        Long pageCount = (courseRepository.count() % 10 > 0) ? courseRepository.count()/10 + 1 : courseRepository.count()/10;
        Pageable pageRequest = PageRequest.of(page,10);

        return courseRepository.findAll(pageRequest)
                .stream()
                .map((c) -> new CourseResponse(c.getCourseCode(), c.getName(), c.getLecturer().getName(),
                c.getHours()
                        .stream()
                        .map((h) -> new CourseHourResponse(h.getCourseHourId().getDayOfWeek(), h.getCourseHourId().getHour(), h.getRoom().getName()))
                        .toList(),pageCount))
                .toList();
    }

    public DetailedCourseResponse getCourse(String courseCode) {
        return DetailedCourseResponse.fromCourse(courseRepository.findByCourseCode(courseCode).get(0));
    }

    public List<CourseStudentsResponse> getCourseStudents(String courseCode) {
        return courseRepository
                .findByCourseCode(courseCode)
                .get(0)
                .getStudents()
                .stream()
                .map(CourseStudentsResponse::fromStudent)
                .toList();
    }

    public MessageResponse addNewAssistant(String courseCode, Long id) {
        Course existingCourse = courseRepository.findByCourseCode(courseCode).get(0);
        Assistant assistant = assistantRepository.findById(id).get();

        existingCourse.addAssistant(assistant);
        assistant.addCourse(existingCourse);

        courseRepository.save(existingCourse);
        assistantRepository.save(assistant);

        return new MessageResponse("Asistan başarıyla eklendi", ResponseType.SUCCESS);

    }

    public List<CourseResponse> getLecturerCourses(String username) {
        return lecturerRepository.findByUsername(username).getCourses().stream().map(CourseResponse::fromCourse).toList();
    }

    public List<CourseResponse> getAssistantCourses(String username) {
        return assistantRepository.findByUsername(username).getCourses().stream().map(CourseResponse::fromCourse).toList();
    }

    public List<SourceResponse> getSources(String courseCode) {
        return courseRepository
                .findByCourseCode(courseCode)
                .get(0)
                .getCourseSources()
                .stream()
                .map(s -> new SourceResponse(s.getName(),s.getType().toString(), s.getUrl(), s.getId())).toList();
    }

    public MessageResponse addLinkSource(String courseCode, SourceLinkRequest sourceLinkRequest) {
        Course course = courseRepository.findByCourseCode(courseCode).get(0);
        CourseSource courseSource = new CourseSource(sourceLinkRequest.name(), SourceType.LINK, sourceLinkRequest.url(), null,course);
        course.getCourseSources().add(courseSource);

        courseSourceRepository.save(courseSource);
        courseRepository.save(course);
        return new MessageResponse("Kaynak başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public MessageResponse addFileSource(String courseCode, MultipartFile file, String name) throws IOException {
        Course course = courseRepository.findByCourseCode(courseCode).get(0);
        CourseSource courseSource = new CourseSource(name,SourceType.DOCUMENT,"", file.getBytes(),course);
        course.getCourseSources().add(courseSource);

        courseSourceRepository.save(courseSource);
        courseRepository.save(course);
        return new MessageResponse("Kaynak başarıyla eklendi.", ResponseType.SUCCESS);
    }

    public byte[] getFileSource(String courseCode, Long sourceId) {
        Course course = courseRepository.findByCourseCode(courseCode).get(0);

        return course.getCourseSources().stream().filter(s -> s.getId().equals(sourceId)).findFirst().get().getFile();
    }

    public MessageResponse addAnnouncement(String courseCode, AnnouncementRequest request) {
        Course course = courseRepository.findByCourseCode(courseCode).get(0);
        CourseAnnouncements announcement = new CourseAnnouncements(request.title(),request.announcement(), request.username(), request.postDate(),course);

        course.getAnnouncements().add(announcement);
        courseAnnouncementsRepository.save(announcement);
        courseRepository.save(course);

        return new MessageResponse("Duyuru oluşturuldu.", ResponseType.SUCCESS);
    }
}
