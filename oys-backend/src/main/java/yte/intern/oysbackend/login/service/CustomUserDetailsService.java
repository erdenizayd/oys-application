package yte.intern.oysbackend.login.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.assistant.entity.Assistant;
import yte.intern.oysbackend.assistant.repository.AssistantRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.lecturer.entity.Lecturer;
import yte.intern.oysbackend.lecturer.repository.LecturerRepository;
import yte.intern.oysbackend.login.entity.dto.NewStudentRequest;
import yte.intern.oysbackend.login.entity.Authority;
import yte.intern.oysbackend.login.entity.User;
import yte.intern.oysbackend.login.repository.UserRepository;
import yte.intern.oysbackend.student.entity.Student;
import yte.intern.oysbackend.student.repository.StudentRepository;
import yte.intern.oysbackend.user.entity.Role;
import yte.intern.oysbackend.user.entity.UserProfile;
import yte.intern.oysbackend.user.repository.UserProfileRepository;

import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    private final LecturerRepository lecturerRepository;

    private final StudentRepository studentRepository;

    private final AssistantRepository assistantRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username %s is not present.".formatted(username)));
    }

    public String createNewUser(NewStudentRequest request) {
        Random rand = new Random();
        String password = rand.ints(48, 123)
                .filter(num -> (num < 58 || num > 64) && (num < 91 || num > 96))
                .limit(8)
                .mapToObj(c -> (char) c).collect(StringBuffer::new, StringBuffer::append, StringBuffer::append)
                .toString();

        if (request.type().equals("STUDENT")) {
            userRepository
                    .save(new User(request.name(),
                            request.primaryEmail(),
                            request.username(),
                            passwordEncoder.encode((password)),
                            Set.of(new Authority("STUDENT"))));

            studentRepository.save(new Student(request.username(), request.name(), Role.STUDENT, request.primaryEmail()));

        }

        if (request.type().equals("LECTURER")) {
            userRepository
                    .save(new User(request.name(),
                            request.primaryEmail(),
                            request.username(),
                            passwordEncoder.encode((password)),
                            Set.of(new Authority("LECTURER"))));

            lecturerRepository
                    .save(new Lecturer(request.username(), request.name(), Role.LECTURER, request.primaryEmail()));
        }

        if (request.type().equals("ADMIN")) {
            userRepository
                    .save(new User(request.name(),
                            request.primaryEmail(),
                            request.username(),
                            passwordEncoder.encode((password)),
                            Set.of(new Authority("ADMIN"))));

            userProfileRepository
                    .save(new UserProfile(request.username(), request.name(), Role.ADMIN, request.primaryEmail()));
        }

        if (request.type().equals("ASSISTANT")) {
            userRepository
                    .save(new User(request.name(),
                            request.primaryEmail(),
                            request.username(),
                            passwordEncoder.encode((password)),
                            Set.of(new Authority("ASSISTANT"))));

            assistantRepository
                    .save(new Assistant(request.username(), request.name(), Role.ASSISTANT, request.primaryEmail()));
        }

        return password;
    }

    public List<User> displayUsers() {
        return userRepository.findAll();
    }

    public MessageResponse disableAccount(Long id) {
        User existingUser = userRepository.getUserById(id);
        existingUser.disable();
        userRepository.save(existingUser);
        return new MessageResponse("Kullanıcının hesabı deaktive edildi.", ResponseType.SUCCESS);
    }

    public MessageResponse enableAccount(Long id) {
        User existingUser = userRepository.getUserById(id);
        existingUser.enable();
        userRepository.save(existingUser);
        return new MessageResponse("Kullanıcının hesabı aktive edildi.", ResponseType.SUCCESS);
    }

}
