package yte.intern.oysbackend.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.user.entity.dto.UserProfileRequest;
import yte.intern.oysbackend.user.entity.dto.UserProfileResponse;
import yte.intern.oysbackend.user.service.UserProfileService;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class UserProfileController {
    private final UserProfileService userProfileService;

    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/getProfile/{username}")
    public UserProfileResponse getProfile(@PathVariable String username) {
        return userProfileService.getProfile(username);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @PutMapping("/updateProfile")
    public MessageResponse updateProfile(@RequestBody UserProfileRequest request) {
        return userProfileService.updateProfile(request);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @PostMapping("/updateProfile/{username}/newPhoto")
    public MessageResponse updateProfilePhoto(@PathVariable String username, @RequestParam("image") MultipartFile file) throws IOException {
        return userProfileService.updateProfilePhoto(username, file);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @GetMapping("/getProfile/{username}/profilePhoto")
    public byte[] getProfilePhoto(@PathVariable String username) {
        return userProfileService.getProfilePhoto(username);
    }

}
