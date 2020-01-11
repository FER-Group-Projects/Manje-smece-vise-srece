package hr.fer.opp.bashcrash.manjesmecevisesrece.service;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.UserRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel applicationUserModel = userRepository.findByUsername(username);
        if (applicationUserModel == null) {
            throw new UsernameNotFoundException(username);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        if (applicationUserModel.isAdministrator()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        if (applicationUserModel.getCompany() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));

            if (Objects.equals(applicationUserModel.getCompany().getDirector().getId(), applicationUserModel.getId())) {
                authorities.add(new SimpleGrantedAuthority("ROLE_DIRECTOR"));
            }
        }
        System.out.println(applicationUserModel.getUsername() + " " + authorities);
        return new User(applicationUserModel.getUsername(), applicationUserModel.getPassword(), authorities);
    }
}
