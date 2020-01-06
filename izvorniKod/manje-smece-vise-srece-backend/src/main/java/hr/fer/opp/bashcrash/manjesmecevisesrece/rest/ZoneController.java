package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CityRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CountryRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.ZoneRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.CityDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.ZoneDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.City;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Zone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/zones")
public class ZoneController {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @GetMapping("/all")
    public List<ZoneDTO> listAllZones() {
        return zoneRepository
                .findAll()
                .stream()
                .map(ZoneDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ZoneDTO findByID(@PathVariable int id) {
        Optional<Zone> optionalZone = zoneRepository.findById(id);

        if (!optionalZone.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new ZoneDTO(optionalZone.get());
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/create")
    public void createZone(@RequestBody ZoneDTO zoneDTO) {
        Zone zone = new Zone();

        if (zoneRepository.existsByZoneName(zoneDTO.getZoneName()) || zoneDTO.getCity() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        zone.setZoneName(zoneDTO.getZoneName());
        zone.setCity(cityRepository.findById(zoneDTO.getCity().getId()).get());

        zoneRepository.save(zone);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{id}")
    public void deleteZone(@PathVariable int id) {
        zoneRepository.deleteById(id);
    }

}
