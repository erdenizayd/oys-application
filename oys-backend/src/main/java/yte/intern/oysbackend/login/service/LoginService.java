package yte.intern.oysbackend.login.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;
import yte.intern.oysbackend.login.entity.dto.ChangePasswordRequest;
import yte.intern.oysbackend.login.entity.dto.LoginRequest;
import yte.intern.oysbackend.login.entity.Authority;
import yte.intern.oysbackend.login.entity.User;
import yte.intern.oysbackend.login.repository.UserRepository;
import yte.intern.oysbackend.login.response.LoginResponse;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public LoginResponse login(@Valid LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password());

        Authentication authenticatedAuthentication = authenticationManager.authenticate(token);

        SecurityContext newContext = SecurityContextHolder.createEmptyContext();
        newContext.setAuthentication(authenticatedAuthentication);
        SecurityContextHolder.setContext(newContext);

        return new LoginResponse(ResponseType.SUCCESS, loginRequest.username(),((Authority) (authenticatedAuthentication.getAuthorities().toArray()[0])).getAuthority());
    }

    public MessageResponse changePassword(ChangePasswordRequest changePasswordRequest, String username) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, changePasswordRequest.password());

        try {
            Authentication authenticatedAuthentication = authenticationManager.authenticate(token);

            User user = userRepository.findByUsername(username).get();
            user.changePassword(passwordEncoder.encode(changePasswordRequest.newPassword()));
            userRepository.save(user);

            return new MessageResponse("Şifreniz başarıyla değiştirildi.", ResponseType.SUCCESS);
        }
        catch(AuthenticationException e) {
            return new MessageResponse("Girdiğiniz şifre hatalı.", ResponseType.ERROR);
        }
    }
}
