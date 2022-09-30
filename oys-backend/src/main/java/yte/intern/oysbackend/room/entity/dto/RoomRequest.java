package yte.intern.oysbackend.room.entity.dto;

import yte.intern.oysbackend.room.entity.Room;

public record RoomRequest(
        String name,
        Boolean projectionExists,
        Boolean computerExists,
        Boolean ventilationExists,
        Boolean windowExists,
        Integer capacity
) {
    public static Room toRoom(RoomRequest roomRequest) {
        return new Room(
                roomRequest.name(),
                roomRequest.projectionExists(),
                roomRequest.computerExists(),
                roomRequest.ventilationExists(),
                roomRequest.windowExists(),
                roomRequest.capacity()
        );
    }
}
