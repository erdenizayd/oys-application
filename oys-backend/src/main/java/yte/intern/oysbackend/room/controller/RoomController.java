package yte.intern.oysbackend.room.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.room.entity.dto.RoomRequest;
import yte.intern.oysbackend.room.response.RoomNameResponse;
import yte.intern.oysbackend.room.response.RoomResponse;
import yte.intern.oysbackend.room.service.RoomService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/getRooms")
    public List<RoomNameResponse> getRooms() {
        return roomService.getRooms();
    }

    @GetMapping("/getRooms/{name}")
    public List<RoomResponse> getRoomsByName(@PathVariable String name) {
        return roomService.getRoomsByName(name);
    }

    @PostMapping("/createRoom")
    public MessageResponse createRoom(@RequestBody RoomRequest roomRequest) {
        return roomService.createRoom(roomRequest);
    }
}
