package Api.Api.Service;

import Api.Api.Dto.Car;
import Api.Api.Dto.Place;
import Api.Api.Repositories.CarRepository;
import Api.Api.Repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public CarService(CarRepository carRepository, PlaceRepository placeRepository) {
        this.carRepository = carRepository;
        this.placeRepository = placeRepository;
    }

    public Car add(Car car, UUID userId) {
        Place place = placeRepository.findAll().parallelStream()
                .filter(e -> e.getUsers()
                        .parallelStream()
                        .filter(user -> user.getId().equals(userId))
                        .findFirst()
                        .orElse(null) != null)
                .findFirst()
                .orElse(null);
        car.setPlace(place);
        carRepository.save(car);
        return car;
    }

    public List<Car> getCars(UUID userId) {
        return placeRepository.findAll().parallelStream().filter(e -> e.getUsers().parallelStream().filter(user -> user.getId().equals(userId)).findFirst().orElse(null) != null).findFirst().orElse(null).getCars();
    }

    public Car delete(Car car) {
        carRepository.deleteById(car.getId());
        return car;
    }

    public List<Car> getAll() {
        return carRepository.findAll();
    }

    public Car confirmCar(Car newCar){
        Car car = carRepository.findById(newCar.getId()).get();
        car.setConfirm(newCar.getConfirm());
        carRepository.save(car);
        return car;
    }

    public Boolean getAccess(String plate){
        Car car = carRepository.findAll()
                .parallelStream()
                .filter(e->plate.toUpperCase().contains(e.getPlate().toUpperCase()))
                .findFirst()
                .orElse(null);
        if (car != null) {//&& car.getConfirm()==true){ todo po stronie fronta należy dodać obsługę admina
            return true;
        }
        return false;
    }
}
