package Api.Api.Service;

import Api.Api.Dto.Gate;
import Api.Api.Repositories.GateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GateService {

    private final GateRepository gateRepository;

    @Autowired
    public GateService(GateRepository gateRepository) {
        this.gateRepository = gateRepository;
    }

    public Gate add(Gate gate){
        gateRepository.save(gate);
        return gate;
    }

    public Gate delete(Gate gate){
        Gate findGate = gateRepository.findById(gate.getNr()).get();
        gateRepository.delete(findGate);
        return findGate;
    }

    public List<Gate> getAll(){
        return gateRepository.findAll();
    }

}
