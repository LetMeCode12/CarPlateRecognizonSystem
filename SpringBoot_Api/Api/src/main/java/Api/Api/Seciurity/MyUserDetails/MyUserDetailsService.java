package Api.Api.Seciurity.MyUserDetails;

import Api.Api.Dto.Login;
import Api.Api.Repositories.LoginRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private final LoginRepository loginRepository;

    public MyUserDetailsService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Login user = loginRepository.findBylogin(s);

        MyUserDetails userDetails = new MyUserDetails(user);

        return userDetails;
    }
}
