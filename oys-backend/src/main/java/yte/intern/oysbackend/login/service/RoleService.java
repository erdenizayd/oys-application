package yte.intern.oysbackend.login.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.login.entity.Authority;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class RoleService {
    public String getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for(GrantedAuthority a : authorities) {
            if(a.getAuthority().equals("ADMIN")) {
                return "ADMIN";
            }
            if(a.getAuthority().equals("STUDENT")) {
                return "STUDENT";
            }
            if(a.getAuthority().equals("LECTURER")) {
                return "LECTURER";
            }
            if(a.getAuthority().equals("ASSISTANT")) {
                return "ASSISTANT";
            }
        }
        return ((Authority)(authentication.getAuthorities().toArray()[0])).getAuthority();
    }
}
