package Api.Api.Service;


import Api.Api.ApiApplication;
import Api.Api.Dto.Building;
import Api.Api.Dto.Place;
import Api.Api.Dto.User;
import Api.Api.Repositories.BuildingRepository;
import Api.Api.Repositories.PlaceRepository;
import Api.Api.Repositories.UserRepository;
import Api.Api.Seciurity.JWT.JwtProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final BuildingRepository buildingRepository;

    @Autowired
    public UserService(UserRepository userRepository, PlaceRepository placeRepository, BuildingRepository buildingRepository) {
        this.userRepository = userRepository;
        this.placeRepository = placeRepository;
        this.buildingRepository = buildingRepository;
    }

    public User addNewUser(User user, String placeNr, String buildingNr) {

        user.getLogin().setPassword(new BCryptPasswordEncoder().encode(user.getLogin().getPassword()));
        user.getLogin().setRole("ROLE_" + user.getLogin().getRole());

        Building building = buildingRepository.findAll()
                .parallelStream()
                .filter(e -> e.getNr().toUpperCase().equals(buildingNr.toUpperCase()))
                .findFirst()
                .get();
        Place place = building.getPlaces()
                .parallelStream()
                .filter(e -> e.getNr().toUpperCase().equals(placeNr.toUpperCase()))
                .findFirst()
                .get();
        user.setPlace(place);

        userRepository.save(user);
        return user;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByLogin(String login) {
        return userRepository.findAll().parallelStream().filter(e -> e.getLogin().getLogin().equals(login)).findFirst().orElse(null);
    }

//    public User update(User newUser){
//       User user = userRepository.findById(newUser.getId()).get();
//
//    }
}
