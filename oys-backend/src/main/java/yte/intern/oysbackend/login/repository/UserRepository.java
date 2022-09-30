package yte.intern.oysbackend.login.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.login.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findByNameContainingIgnoreCase(String name, Pageable pageRequest);
    List<User> findByUsernameContainingIgnoreCase(String username, Pageable pageRequest);
    List<User> findByNameAndUsernameContainingIgnoreCase(String name, String username, Pageable pageRequest);

    Optional<User> findByUsername(String username);

    User getUserById(Long id);

    Long countByName(String name);

    Long countByUsername(String username);

    Long countByNameAndUsername(String name, String username);

}
