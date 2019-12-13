package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CountryRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.CountryDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/countries")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/all")
    public List<CountryDTO> listAllCountries() {
        return countryRepository
                .findAll()
                .stream()
                .map(CountryDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CountryDTO findByID(@PathVariable int id) {
        Optional<Country> optionalCountry = countryRepository.findById(id);

        if (!optionalCountry.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new CountryDTO(optionalCountry.get());
    }

    @Secured("ADMIN")
    @PostMapping("/create")
    public void createCountry(@RequestBody CountryDTO countryDTO) {
        Country country = new Country();

        if (countryRepository.existsByCountryName(countryDTO.getCountryName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        country.setCountryName(countryDTO.getCountryName());

        countryRepository.save(country);
    }

    @Secured("ADMIN")
    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable int id) {
        countryRepository.deleteById(id);
    }

}
