package yte.intern.oysbackend.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.assignment.entity.homework.Homework;

public interface HomeworkRepository extends JpaRepository<Homework,Long> {
}
