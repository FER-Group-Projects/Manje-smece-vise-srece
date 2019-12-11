package hr.fer.opp.bashcrash.manjesmecevisesrece.dao;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
