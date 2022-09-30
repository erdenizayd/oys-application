package yte.intern.oysbackend.lecturer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.lecturer.entity.Lecturer;

public interface LecturerRepository extends JpaRepository<Lecturer,Long> {
    Lecturer findLecturerByName(String name);

    Lecturer findByUsername(String username);
}
