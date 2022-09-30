package yte.intern.oysbackend.lecturer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.lecturer.entity.LecturerSchedule;
import yte.intern.oysbackend.lecturer.entity.LecturerScheduleId;

public interface LecturerScheduleRepository extends JpaRepository<LecturerSchedule, LecturerScheduleId> {
}
