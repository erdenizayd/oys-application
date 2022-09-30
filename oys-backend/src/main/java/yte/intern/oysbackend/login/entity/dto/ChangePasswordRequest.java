package yte.intern.oysbackend.login.entity.dto;

public record ChangePasswordRequest(
        String password,
        String newPassword
) {
}
