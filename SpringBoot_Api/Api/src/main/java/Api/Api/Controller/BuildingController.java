package Api.Api.Controller;

import Api.Api.Dto.Building;
import Api.Api.Service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/building")
public class BuildingController {

   private final BuildingService buildingService;

    @Autowired
    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @PostMapping("/add")
    private Building addBuilding(@RequestBody Building building){

        return  buildingService.add(building);
    }

    @GetMapping("/getAll")
    private List<Building> getAllBuildings(){
        return buildingService.getAll();
    }

    @PutMapping("/addGate/{buildingId}/{gateId}")
    private Building addGate(@PathVariable("buildingId") String buildingId,@PathVariable("gateId") Integer gateId){
        return buildingService.addGate(buildingId,gateId);
    }

    @DeleteMapping("/delete/{gateId}")
    private String deleteBuilding(@RequestBody Building building, @PathVariable Integer gateId){
        return buildingService.delete(building.getId(),gateId);
    }
}
