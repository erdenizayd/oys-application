package yte.intern.oysbackend.user.entity.dto;

import yte.intern.oysbackend.user.entity.UserProfile;

public record UserProfileResponse(
        String username,
        String name,
        String role,
        String primaryEmail,
        String secondaryEmail,
        Long phoneNumber,
        String about,
        String address
) {
    public static UserProfileResponse fromProfile(UserProfile userProfile) {
        return new UserProfileResponse(
          userProfile.getUsername(),
          userProfile.getName(),
          userProfile.getRole().toString(),
          userProfile.getPrimaryEmail(),
          userProfile.getSecondaryEmail(),
          userProfile.getPhoneNumber(),
            userProfile.getAbout(),
                userProfile.getAddress()
        );
    }
}
