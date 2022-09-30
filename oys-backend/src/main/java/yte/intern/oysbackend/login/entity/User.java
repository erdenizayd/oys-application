package yte.intern.oysbackend.login.entity;

import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;
import yte.intern.oysbackend.common.entity.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity implements UserDetails {
    public String name;
    public String primaryEmail;
    private String username;
    private String password;
    private Boolean isEnabled = true;

    public User(String name, String primaryEmail, String username, String password, Set<Authority> authorities) {
        this.name = name;
        this.primaryEmail = primaryEmail;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id"))
    public Set<Authority> authorities = new LinkedHashSet<>();

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }


    public void disable() {
        this.isEnabled = false;
    }

    public void enable() {
        this.isEnabled = true;
    }

    public void changePassword(String encode) {
        this.password = encode;
    }
}
