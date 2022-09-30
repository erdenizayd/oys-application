package yte.intern.oysbackend.login.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.login.response.UserResponse;
import yte.intern.oysbackend.login.service.ListUsersService;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/{page}")
public class ListUsers {

    private final ListUsersService listUsersService;

    @GetMapping
    @ResponseBody
    public List<UserResponse> getUsers(@PathVariable Integer page) {
        return listUsersService.getUsers(page);
    }

    @GetMapping("/sbn")
    @ResponseBody
    public List<UserResponse> getUsersByName(@PathVariable Integer page, @RequestParam(name="name") String name) {
        return listUsersService.getUsersByName(page,name);
    }

    @GetMapping("/sbu")
    @ResponseBody
    public List<UserResponse> getUsersByUsername(@PathVariable Integer page, @RequestParam(name="username") String username) {
        return listUsersService.getUsersByUsername(page,username);
    }

    @GetMapping("/sbnu")
    @ResponseBody
    public List<UserResponse> getUsersByNameAndUsername(@PathVariable Integer page, @RequestParam(name="name") String name, @RequestParam(name="username") String username) {
        return listUsersService.getUsersByNameAndUsername(page,name,username);
    }

}
