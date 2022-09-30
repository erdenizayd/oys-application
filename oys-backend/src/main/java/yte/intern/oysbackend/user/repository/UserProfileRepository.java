package yte.intern.oysbackend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.user.entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    UserProfile findByUsername(String username);
}
