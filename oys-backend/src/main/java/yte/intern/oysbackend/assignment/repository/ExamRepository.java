package yte.intern.oysbackend.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assignment.entity.exam.Exam;
import yte.intern.oysbackend.room.entity.Room;

import java.time.LocalDateTime;

public interface ExamRepository extends JpaRepository<Exam,Long> {
    Boolean existsByDate(LocalDateTime date);


    Boolean existsByDateAndRoom(LocalDateTime dateTime, Room room);
}
