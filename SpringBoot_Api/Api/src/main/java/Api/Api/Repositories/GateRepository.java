package Api.Api.Repositories;

import Api.Api.Dto.Gate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GateRepository extends JpaRepository<Gate,Integer> {
}
