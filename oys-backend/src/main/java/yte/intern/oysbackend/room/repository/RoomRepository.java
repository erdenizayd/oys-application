package yte.intern.oysbackend.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.room.response.RoomListResponse;
import yte.intern.oysbackend.room.response.RoomNameResponse;
import yte.intern.oysbackend.room.response.RoomResponse;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {
    Room findRoomById(Long id);


    Room findRoomByName(String name);

    @Query("SELECT new yte.intern.oysbackend.room.response.RoomResponse(r.name, course.name, courseHour.courseHourId.dayOfWeek," +
            " courseHour.courseHourId.hour) FROM Room r\n" +
            "INNER JOIN CourseHour courseHour ON courseHour.room = r " +
            "INNER JOIN Course course ON course.room = r " +
            "WHERE r.name =:name AND course = courseHour.course")
    List<RoomResponse> getRoomsByNameQuery(@Param("name")String name);

    @Query("SELECT new yte.intern.oysbackend.room.response.RoomNameResponse(r.id, r.name, r.projectionExists, r.computerExists, r.ventilationExists, r.windowExists, r.capacity)" +
            " FROM Room r")
    List<RoomNameResponse> getAllQuery();
}
