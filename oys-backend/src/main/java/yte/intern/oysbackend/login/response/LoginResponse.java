package yte.intern.oysbackend.login.response;

import yte.intern.oysbackend.common.response.ResponseType;

public record LoginResponse(
        ResponseType response,
        String username,
        String role
) {
}
