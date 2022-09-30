package yte.intern.oysbackend.room.response;

public record RoomNameResponse(
        Long id,
        String name,
        Boolean projectionExists,
        Boolean computerExists,
        Boolean ventilationExists,
        Boolean windowExists,
        Integer capacity
) {
}
