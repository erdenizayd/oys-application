package yte.intern.oysbackend.login.response;

public record UserResponse(
        Long id,
        String name,
        String username,
        Boolean isEnabled,
        Long pageCount
) {
}
