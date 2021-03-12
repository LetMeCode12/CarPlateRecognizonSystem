package Api.Api.Seciurity.MyUserDetails;

import Api.Api.Dto.Login;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MyUserDetails implements UserDetails {

    private Login user;

    public MyUserDetails(Login myUser) {
        this.user = myUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>();

        if (this.user.getRole() != null) {
            GrantedAuthority authority = new SimpleGrantedAuthority(this.user.getRole());
            authorities.add(authority);


            return authorities;
        }
        return null;
    }

    @Override
    public String getPassword() {
        if (user != null) {
            return user.getPassword();
        }
        return "";
    }

    @Override
    public String getUsername() {
        return user.getLogin();
    }

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
        return true;
    }
}
