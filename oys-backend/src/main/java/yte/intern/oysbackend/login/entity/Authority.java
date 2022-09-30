package yte.intern.oysbackend.login.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import yte.intern.oysbackend.common.entity.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Authority extends BaseEntity implements GrantedAuthority {

    public Authority(String authority) {
        this.authority = authority;
    }

    @ManyToMany(mappedBy = "authorities")
    public Set<User> users;

    public String authority;
}
