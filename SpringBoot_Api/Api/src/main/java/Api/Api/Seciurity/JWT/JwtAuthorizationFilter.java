package Api.Api.Seciurity.JWT;

import Api.Api.ApiApplication;
import Api.Api.Dto.Login;
import Api.Api.Repositories.LoginRepository;
import Api.Api.Seciurity.MyUserDetails.MyUserDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private LoginRepository loginRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, LoginRepository loginRepository) {
        super(authenticationManager);
        this.loginRepository = loginRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String header = request.getHeader(JwtProperties.HEADER_STRING);

        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        Authentication authentication = getUsernamePasswordAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);

    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader(JwtProperties.HEADER_STRING);

        if (token != null) {


                String userName = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET.getBytes()))
                        .build()
                        .verify(token.replace(JwtProperties.TOKEN_PREFIX, ""))
                        .getSubject();

                if (userName != null) {
                    Login user = loginRepository.findBylogin(userName);

                    MyUserDetails userPrincipal = new MyUserDetails(user);

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userName, null, userPrincipal.getAuthorities());
                    return auth;

                }


        }
        return null;
    }
}
