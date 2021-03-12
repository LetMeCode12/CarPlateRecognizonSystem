package Api.Api.Service;

import Api.Api.Dto.Building;
import Api.Api.Dto.Place;
import Api.Api.Repositories.BuildingRepository;
import Api.Api.Repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PlaceService {

    public final PlaceRepository placeRepository;
    public final BuildingRepository buildingRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository, BuildingRepository buildingRepository) {
        this.placeRepository = placeRepository;
        this.buildingRepository = buildingRepository;
    }

    public Place addPlace(UUID buildingId, Place place){

        Building building =buildingRepository.findById(buildingId).get();
        place.setBuilding(building);
        placeRepository.save(place);
        return place;
    }

    public List<Place> getAll(){
        return placeRepository.findAll();
    }

    public Place delete(UUID placeId){
        Place place = placeRepository.findById(placeId).get();
        placeRepository.delete(place);
        return place;
    }
}
