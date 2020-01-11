package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {

    private String username;
    private String email;
    private String password;
    private List<String> authorities;

    public UserDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public UserDTO(UserModel userModel) {
        this(userModel.getUsername(), userModel.getEmail(), "");
    }

    public UserDTO(User user) {
        this(user.getUsername(), "", "");

        this.authorities = user
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .map(s -> s.replace("ROLE_", ""))
                .collect(Collectors.toList());
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }
}
