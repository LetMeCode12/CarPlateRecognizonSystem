package Api.Api.Controller;

import Api.Api.Dto.Car;
import Api.Api.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/car")
public class CarController {


    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/add/{userId}")
    private Car addCar(@RequestBody Car car, @PathVariable UUID userId) {
        return carService.add(car, userId);
    }

    @DeleteMapping("/delete")
    private Car removeCar(@RequestBody Car car) {
        return carService.delete(car);
    }

    @GetMapping("/all")
    private List<Car> getAll() {
        return carService.getAll();
    }

    @PostMapping("/confirm")
    private Car confirmCar(@RequestBody Car car) {
        return carService.confirmCar(car);
    }

    @PostMapping("/access/{plate}")
    private Boolean getAccess(@PathVariable String plate) {
        return carService.getAccess(plate);
    }

    @GetMapping("/userCars/{userId}")
    private List<Car> getCarsByUser(@PathVariable UUID userId) {
        return carService.getCars(userId);
    }
}
