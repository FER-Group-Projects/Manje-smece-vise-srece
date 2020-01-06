package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CityRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CountryRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.CityDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.CountryDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.City;
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
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/all")
    public List<CityDTO> listAllCities() {
        return cityRepository
                .findAll()
                .stream()
                .map(CityDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CityDTO findByID(@PathVariable int id) {
        Optional<City> optionalCity = cityRepository.findById(id);

        if (!optionalCity.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new CityDTO(optionalCity.get());
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/create")
    public void createCity(@RequestBody CityDTO cityDTO) {
        City city = new City();

        if (cityRepository.existsByCityName(cityDTO.getCityName()) || cityDTO.getCountry() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        city.setCityName(cityDTO.getCityName());
        city.setCountry(countryRepository.findById(cityDTO.getCountry().getId()).get());

        cityRepository.save(city);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable int id) {
        cityRepository.deleteById(id);
    }

}
