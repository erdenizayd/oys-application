package yte.intern.oysbackend.course.repository.CourseSource;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.course.entity.CourseSource.CourseSource;

public interface CourseSourceRepository extends JpaRepository<CourseSource, Long> {
}
