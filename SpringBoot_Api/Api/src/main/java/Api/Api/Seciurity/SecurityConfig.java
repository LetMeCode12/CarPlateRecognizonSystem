package Api.Api.Seciurity;

import Api.Api.Repositories.LoginRepository;
import Api.Api.Seciurity.JWT.JwtAuthenticationFilter;
import Api.Api.Seciurity.JWT.JwtAuthorizationFilter;
import Api.Api.Seciurity.MyUserDetails.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private MyUserDetailsService myUserDetailsService;
    private LoginRepository loginRepository;

    public SecurityConfig(MyUserDetailsService myUserDetailsService, LoginRepository loginRepository) {
        this.myUserDetailsService = myUserDetailsService;
        this.loginRepository = loginRepository;
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), this.loginRepository))
                .authorizeRequests()
                .antMatchers("/login", "/user/register","/car/access/*")
                .permitAll()
                .antMatchers("/place/*/**","/building/*/**","/gate/*/**","/car/all")
                .hasRole("ADMIN")
                .anyRequest().authenticated();
    }


    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        daoAuthenticationProvider.setUserDetailsService(this.myUserDetailsService);

        return daoAuthenticationProvider;
    }


}
