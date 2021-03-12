package Api.Api.Controller;

import Api.Api.Dto.Building;
import Api.Api.Dto.Place;
import Api.Api.Service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/place")
public class PlaceController {

    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @PostMapping("/add/{buildingId}")
    private Place addPlace(@PathVariable String buildingId, @RequestBody Place place){
        return placeService.addPlace(UUID.fromString(buildingId),place);
    }

    @GetMapping("/getAll")
    private List<Place> getAll(){
        return placeService.getAll();
    }

    @DeleteMapping("/delete")
    private Place deletePlace(@RequestBody Place place){
        return placeService.delete(place.getId());
    }
}
