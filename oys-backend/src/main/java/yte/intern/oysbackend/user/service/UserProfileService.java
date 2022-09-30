package yte.intern.oysbackend.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.user.entity.dto.UserProfileRequest;
import yte.intern.oysbackend.user.entity.dto.UserProfileResponse;
import yte.intern.oysbackend.user.entity.UserProfile;
import yte.intern.oysbackend.user.repository.UserProfileRepository;
import yte.intern.oysbackend.user.util.ProfilePhotoUtility;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    public UserProfileResponse getProfile(String username) {
        return UserProfileResponse.fromProfile(userProfileRepository.findByUsername(username));
    }

    public MessageResponse updateProfile(UserProfileRequest request) {
        UserProfile userProfile = userProfileRepository.findByUsername(request.username());
        userProfile.updateProfile(request);
        userProfileRepository.save(userProfile);
        return new MessageResponse("Profil bilgileri başarıyla güncellendi.", ResponseType.SUCCESS);
    }

    public MessageResponse updateProfilePhoto(String username, MultipartFile file) throws IOException {
        UserProfile userProfile = userProfileRepository.findByUsername(username);
        userProfile.updateProfilePhoto(ProfilePhotoUtility.compressImage(file.getBytes()));
        userProfileRepository.save(userProfile);
        return new MessageResponse("Profil fotoğrafı başarıyla güncellendi.", ResponseType.SUCCESS);
    }

    public byte[] getProfilePhoto(String username) {
        UserProfile userProfile = userProfileRepository.findByUsername(username);
        return ProfilePhotoUtility.decompressImage(userProfile.getProfilePhoto());
    }
}
