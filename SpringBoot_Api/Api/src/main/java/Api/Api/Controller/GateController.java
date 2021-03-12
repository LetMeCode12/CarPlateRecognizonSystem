package Api.Api.Controller;

import Api.Api.Dto.Gate;
import Api.Api.Service.GateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gate")
public class GateController {

    private final GateService gateService;

    @Autowired
    public GateController(GateService gateService) {
        this.gateService = gateService;
    }

    @PostMapping("/add")
    private Gate addGate(@RequestBody Gate gate){
        return gateService.add(gate);
    }

    @DeleteMapping("/delete")
    private Gate deleteGate(@RequestBody Gate gate){
        return gateService.delete(gate);
    }

    @GetMapping("/getAll")
    private List<Gate> getAll(){
        return gateService.getAll();
    }
}
