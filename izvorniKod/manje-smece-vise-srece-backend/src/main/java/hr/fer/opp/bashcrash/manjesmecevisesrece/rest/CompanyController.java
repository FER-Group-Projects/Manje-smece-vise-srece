package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CompanyRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.UserRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.CompanyDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.UserDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Company;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<CompanyDTO> listAllCompanies() {
        return companyRepository
                .findAll()
                .stream()
                .map(CompanyDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CompanyDTO findByID(@PathVariable int id) {
        Optional<Company> optionalCompany = companyRepository.findById(id);

        if (!optionalCompany.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new CompanyDTO(optionalCompany.get());
    }

    @GetMapping("/{id}/employees")
    public List<UserDTO> listAllEmployees(@PathVariable int id) {
        Optional<Company> optionalCompany = companyRepository.findById(id);

        if (!optionalCompany.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return userRepository.findByCompany(optionalCompany.get())
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Secured("ROLE_DIRECTOR")
    @PutMapping("/{id}/add-employee/{userId}")
    public void addEmployeeToCompany(@PathVariable int id, @PathVariable long userId) {
        Optional<Company> optionalCompany = companyRepository.findById(id);
        Optional<UserModel> optionalUserModel = userRepository.findById(userId);

        if (!optionalCompany.isPresent() || !optionalUserModel.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        UserModel user = optionalUserModel.get();

        user.setCompany(optionalCompany.get());

        userRepository.save(user);
    }

    @Secured("ROLE_DIRECTOR")
    @PutMapping("/{id}/remove-employee/{userId}")
    public void removeEmployeeFromCompany(@PathVariable int id, @PathVariable long userId) {
        Optional<Company> optionalCompany = companyRepository.findById(id);
        Optional<UserModel> optionalUserModel = userRepository.findById(userId);

        if (!optionalCompany.isPresent() || !optionalUserModel.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        UserModel user = optionalUserModel.get();

        user.setCompany(null);

        userRepository.save(user);
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/create")
    public void createCompany(@RequestBody CompanyDTO companyDTO) {
        Company company = new Company();

        UserModel director = userRepository.findByUsername(company.getDirector().getUsername());

        if (director == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        company.setDirector(director);
        company.setCompanyName(companyDTO.getCompanyName());
        company.setDescription(companyDTO.getDescription());

        companyRepository.save(company);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/{id}")
    public void createCompany(@PathVariable int id, @RequestBody CompanyDTO companyDTO) {
        Optional<Company> optionalCompany = companyRepository.findById(id);

        if (!optionalCompany.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Company company = optionalCompany.get();

        UserModel director = userRepository.findByUsername(company.getDirector().getUsername());

        if (director == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        company.setDirector(director);
        company.setCompanyName(companyDTO.getCompanyName());
        company.setDescription(companyDTO.getDescription());

        companyRepository.save(company);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable int id) {
        companyRepository.deleteById(id);
    }

}
