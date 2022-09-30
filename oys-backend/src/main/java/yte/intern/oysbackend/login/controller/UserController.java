package yte.intern.oysbackend.login.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.login.entity.dto.NewStudentRequest;
import yte.intern.oysbackend.login.service.CustomUserDetailsService;

import javax.validation.Valid;

@RestController
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor

public class UserController {
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/newUser")
    public String createNewUser(@RequestBody @Valid NewStudentRequest request) {
        return customUserDetailsService.createNewUser(request);
    }

    @PutMapping("/users/disable/{id}")
    public MessageResponse disableAccount(@PathVariable Long id) {
        return customUserDetailsService.disableAccount(id);
    }

    @PutMapping("/users/enable/{id}")
    public MessageResponse enableAccount(@PathVariable Long id) {
        return customUserDetailsService.enableAccount(id);
    }




}
