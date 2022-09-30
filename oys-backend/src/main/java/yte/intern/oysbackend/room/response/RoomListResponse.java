package yte.intern.oysbackend.room.response;

import java.util.List;

public record RoomListResponse(
        List<RoomResponse> roomResponseList
) {
}
