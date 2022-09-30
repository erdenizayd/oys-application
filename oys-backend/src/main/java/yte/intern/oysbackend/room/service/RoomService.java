package yte.intern.oysbackend.room.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.room.entity.dto.RoomRequest;
import yte.intern.oysbackend.room.entity.Room;
import yte.intern.oysbackend.room.repository.RoomRepository;
import yte.intern.oysbackend.room.response.RoomNameResponse;
import yte.intern.oysbackend.room.response.RoomResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomNameResponse> getRooms() {
        return roomRepository.getAllQuery();
    }

    public List<RoomResponse> getRoomsByName(String name) {
        return roomRepository.getRoomsByNameQuery(name);
    }

    public MessageResponse createRoom(RoomRequest roomRequest) {
        Room newRoom = RoomRequest.toRoom(roomRequest);
        roomRepository.save(newRoom);
        return new MessageResponse("Sınıf başarıyla eklendi.", ResponseType.SUCCESS);
    }
}
