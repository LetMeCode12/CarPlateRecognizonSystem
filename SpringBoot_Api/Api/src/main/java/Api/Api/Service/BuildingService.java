package Api.Api.Service;

import Api.Api.Dto.Building;
import Api.Api.Dto.Gate;
import Api.Api.Repositories.BuildingRepository;
import Api.Api.Repositories.GateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final GateRepository gateRepository;

    @Autowired
    public BuildingService(BuildingRepository buildingRepository, GateRepository gateRepository) {
        this.buildingRepository = buildingRepository;
        this.gateRepository = gateRepository;
    }

    public Building add(Building building){
        buildingRepository.save(building);
        return building;
    }

    public List<Building> getAll(){
        return buildingRepository.findAll();
    }

    public Building addGate(String buildingId, Integer gateId ){
        Building building = buildingRepository.findById(UUID.fromString(buildingId)).get();
        Gate gate = gateRepository.findById(gateId).get();
        gate.getBuildings().add(building);
        gateRepository.save(gate);
        return building;
    }

    public String delete(UUID buildingId,Integer gateId){
        Gate gate = gateRepository.findById(gateId).get();
        try {
            gate.getBuildings().remove(gate.getBuildings().parallelStream().filter(e -> e.getId().equals(buildingId)).findFirst().get());
            gateRepository.save(gate);
        }catch (Exception e){
            System.out.println("Building doesn` t exist in this gate");
        }
        buildingRepository.deleteById(buildingId);
        return "Deleted";
    }
}
