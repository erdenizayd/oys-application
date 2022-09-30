package yte.intern.oysbackend.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.student.entity.StudentSchedule;
import yte.intern.oysbackend.student.entity.StudentScheduleId;

public interface StudentScheduleRepository extends JpaRepository<StudentSchedule, StudentScheduleId> {

}
