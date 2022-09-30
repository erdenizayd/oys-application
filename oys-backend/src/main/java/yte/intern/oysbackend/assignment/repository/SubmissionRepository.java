package yte.intern.oysbackend.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assignment.entity.homework.Submission;

public interface SubmissionRepository extends JpaRepository<Submission,Long> {
    boolean existsByStudentId(Long id);
}
