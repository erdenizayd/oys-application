package yte.intern.oysbackend.login.entity.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

public record LoginRequest(@NotNull
                           String username,
                           @NotNull
                           String password)
{}
