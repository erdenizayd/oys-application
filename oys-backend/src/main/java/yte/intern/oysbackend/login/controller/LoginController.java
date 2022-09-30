package yte.intern.oysbackend.login.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.login.entity.dto.ChangePasswordRequest;
import yte.intern.oysbackend.login.entity.dto.LoginRequest;
import yte.intern.oysbackend.login.response.LoginResponse;
import yte.intern.oysbackend.login.service.LoginService;
import yte.intern.oysbackend.login.service.RoleService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final RoleService roleService;
    @PostMapping("/userLogin")
    public LoginResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }

    @GetMapping("/getRole")
    public String getRole() {
        return roleService.getRole();
    }


    @PutMapping("/changePassword/{username}")
    public MessageResponse changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, @PathVariable String username) {
        return loginService.changePassword(changePasswordRequest,username);
    }

}
