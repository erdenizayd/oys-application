package yte.intern.oysbackend.login.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.login.entity.User;
import yte.intern.oysbackend.login.response.UserResponse;
import yte.intern.oysbackend.login.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListUsersService {
    private final UserRepository userRepository;
    public List<UserResponse> getUsers(Integer page) {
        Long pageCount = (userRepository.count() % 10 > 0) ? userRepository.count()/10 + 1 : userRepository.count()/10;
        Pageable pageRequest = PageRequest.of(page,10);
        return userRepository
                .findAll(pageRequest)
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getName(), u.getUsername(), u.getIsEnabled(), pageCount))
                .toList();
    }

    public List<UserResponse> getUsersByName(Integer page, String name) {
        Pageable pageRequest = PageRequest.of(page,10);
        List<User> result = userRepository
                .findByNameContainingIgnoreCase(name,pageRequest);
        Long pageCount = (long) ((result.size() % 10 > 0) ?
                (result.size() / 10 + 1) :
                (result.size() / 10));
        return result
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getName(), u.getUsername(), u.getIsEnabled(), pageCount))
                .toList();
    }

    public List<UserResponse> getUsersByUsername(Integer page, String username) {
        Pageable pageRequest = PageRequest.of(page,10);
        List<User> result = userRepository
                .findByUsernameContainingIgnoreCase(username,pageRequest);
        Long pageCount = (long) ((result.size() % 10 > 0) ?
                (result.size() / 10 + 1) :
                (result.size() / 10));

        return result
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getName(), u.getUsername(), u.getIsEnabled(), pageCount))
                .toList();
    }

    public List<UserResponse> getUsersByNameAndUsername(Integer page, String name, String username) {
        Pageable pageRequest = PageRequest.of(page,10);
        List<User> result = userRepository
                .findByNameAndUsernameContainingIgnoreCase(name,username,pageRequest);
        Long pageCount = (long) ((result.size() % 10 > 0) ?
                (result.size() / 10 + 1) :
                (result.size() / 10));
        return result
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getName(), u.getUsername(), u.getIsEnabled(), pageCount))
                .toList();
    }
}
