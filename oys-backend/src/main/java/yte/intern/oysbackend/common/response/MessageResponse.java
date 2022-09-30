package yte.intern.oysbackend.common.response;

public record MessageResponse(
        String message,
        ResponseType response
) {
}
