package yte.intern.oysbackend.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.course.entity.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findByCourseCode(String courseCode);

    List<Course> findByName(String name);
    List<Course> findByNameAndCourseCode(String name, String courseCode);

    void deleteByCourseCode(String courseCode);
}
