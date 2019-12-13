package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.UserRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.UserDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(UserRepository userRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody UserDTO userDTO) {
        UserModel userModel = new UserModel();

        userModel.setUsername(userDTO.getUsername());
        userModel.setEmail(userDTO.getEmail());
        userModel.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

        userRepository.save(userModel);
    }

    @Secured("ADMIN")
    @GetMapping("/all")
    public List<UserDTO> listAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Secured("USER")
    @GetMapping("/{username}")
    public UserDTO getUserInformation(@PathVariable String username) {
        String loggedInUsername = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserModel userModel = userRepository.findByUsername(username);

        if (!loggedInUsername.equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (userModel == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new UserDTO(userModel);
    }

    @Secured("USER")
    @PutMapping("/{username}")
    public void updateUserInformation(@PathVariable String username, @RequestBody UserDTO userDTO) {
        String loggedInUsername = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserModel userModel = userRepository.findByUsername(username);

        if (!loggedInUsername.equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (userModel == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if (userDTO.getEmail() != null) userModel.setEmail(userDTO.getEmail());
        if (userDTO.getUsername() != null) userModel.setUsername(userDTO.getUsername());
        if (userDTO.getPassword() != null) userModel.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

        userRepository.save(userModel);
    }

    @Secured("ADMIN")
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        UserModel userModel = userRepository.findByUsername(username);

        if (userModel == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        userRepository.delete(userModel);
    }

}
