package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.UserRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.UserDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserControllerTest {

    private UserRepository userRepository;
    private UserController userController;

    @BeforeEach
    void setUp() {
        BCryptPasswordEncoder bCryptPasswordEncoder = Mockito.mock(BCryptPasswordEncoder.class);

        userRepository = Mockito.mock(UserRepository.class);
        userController = new UserController(userRepository, bCryptPasswordEncoder);

        when(userRepository.existsByEmailOrUsername(anyString(), anyString()))
                .thenReturn(false, true);

        when(userRepository.findByUsername(anyString()))
                .thenReturn(new UserModel());
    }

    @Test
    void testRegistrationSavesUser() {
        UserDTO firstUser = new UserDTO("username", "email@email.com", "password");

        userController.signUp(firstUser);

        // User was saved
        verify(userRepository, times(1))
                .save(any());
    }

    @Test
    void testRegistrationWithDuplicateEmailAddress() {
        UserDTO firstUser = new UserDTO("username1", "email@email.com", "password1");
        UserDTO secondUser = new UserDTO("username2", "email@email.com", "password2");

        userController.signUp(firstUser);

        // First user was saved
        verify(userRepository, times(1))
                .save(any());

        // Second user causes an exception
        assertThrows(Exception.class, () -> userController.signUp(secondUser));
    }

    @Test
    void testRegistrationWithDuplicateUsername() {
        UserDTO firstUser = new UserDTO("username", "email1@email.com", "password1");
        UserDTO secondUser = new UserDTO("username", "email2@email.com", "password2");

        userController.signUp(firstUser);

        // First user was saved
        verify(userRepository, times(1))
                .save(any());

        // Second user causes an exception
        assertThrows(Exception.class, () -> userController.signUp(secondUser));
    }

    @Test
    void testUserCanFetchItsOwnData() {
        userController.getUserInformation("logged_in_user",
                () -> "logged_in_user");

        // Verify interaction with database
        verify(userRepository, times(1))
                .findByUsername(anyString());
    }

    @Test
    void testUserCannotFetchOthersData() {
        assertThrows(Exception.class, () ->
                userController.getUserInformation("different_user",
                        () -> "logged_in_user"));

        // Verify no interaction with database
        verify(userRepository, times(0))
                .findByUsername(anyString());
    }
}