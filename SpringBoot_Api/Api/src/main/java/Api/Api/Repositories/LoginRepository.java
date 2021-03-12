package Api.Api.Repositories;

import Api.Api.Dto.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LoginRepository extends JpaRepository<Login, UUID> {
    Login findBylogin(String login);
}
