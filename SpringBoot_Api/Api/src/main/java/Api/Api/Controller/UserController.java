package Api.Api.Controller;

import Api.Api.Dto.User;
import Api.Api.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    private User registerUser(@RequestBody User user, @RequestParam(required = false) String placeNr, @RequestParam(required = false) String buildingNr) {
        return userService.addNewUser(user, placeNr, buildingNr);
    }

    @GetMapping("/getAll")
    private List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getUser/{login}")
    private User getUserByLogin(@PathVariable String login) {
        return userService.getUserByLogin(login);
    }
}
