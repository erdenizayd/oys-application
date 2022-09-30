package yte.intern.oysbackend.login.entity.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public record NewStudentRequest(
        @NotEmpty
        @Size(max = 255)
        String name,
        @Email
        @Size(max = 255)
        String primaryEmail,
        @NotEmpty
        @Size(max = 255)
        String username,
        @NotEmpty
        @Size(max = 255)
        String type
) {
}
