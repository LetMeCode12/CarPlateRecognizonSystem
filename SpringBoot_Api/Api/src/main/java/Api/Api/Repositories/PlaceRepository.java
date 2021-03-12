package Api.Api.Repositories;

import Api.Api.Dto.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlaceRepository extends JpaRepository<Place, UUID> {
}
