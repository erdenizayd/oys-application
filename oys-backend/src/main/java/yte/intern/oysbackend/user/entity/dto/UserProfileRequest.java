package yte.intern.oysbackend.user.entity.dto;

import yte.intern.oysbackend.user.entity.UserProfile;

public record UserProfileRequest(
        String username,
        String name,
        String role,
        String primaryEmail,
        String secondaryEmail,
        Long phoneNumber,
        String about,
        String address
) {
}
