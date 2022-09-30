package yte.intern.oysbackend.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import yte.intern.oysbackend.common.entity.BaseEntity;
import yte.intern.oysbackend.user.entity.dto.UserProfileRequest;

import javax.persistence.*;

@Entity(name = "user_profile")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="user_type")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile extends BaseEntity {

    public UserProfile(String username, String name, Role role, String primaryEmail) {
        this.username = username;
        this.name = name;
        this.role = role;
        this.primaryEmail = primaryEmail;
    }

    private String username;
    public String name;
    public Role role;
    public String primaryEmail;
    public String secondaryEmail;
    public Long phoneNumber;

    @Column(unique = false, length = 100000)
    private byte[] profilePhoto;
    public String about;

    public String address;

    public void updateProfile(UserProfileRequest request) {
        this.secondaryEmail = request.secondaryEmail();
        this.phoneNumber = request.phoneNumber();
        this.about = request.about();
        this.address = request.address();
    }

    public void updateProfilePhoto(byte[] compressImage) {
        this.profilePhoto = compressImage;
    }
}
