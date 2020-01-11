package hr.fer.opp.bashcrash.manjesmecevisesrece.dao;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Company;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    UserModel findByUsername(String username);

    boolean existsByEmailOrUsername(String email, String username);

    List<UserModel> findByCompany(Company company);

}
