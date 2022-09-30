package yte.intern.oysbackend.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import yte.intern.oysbackend.student.entity.Student;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Student findByUsername(String username);

}
