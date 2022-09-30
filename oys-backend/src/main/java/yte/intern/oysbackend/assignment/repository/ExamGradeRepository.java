package yte.intern.oysbackend.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assignment.entity.exam.ExamGrade;

public interface ExamGradeRepository extends JpaRepository<ExamGrade, Long> {
}
