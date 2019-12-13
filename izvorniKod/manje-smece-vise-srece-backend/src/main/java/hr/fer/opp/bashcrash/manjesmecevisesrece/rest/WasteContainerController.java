package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CompanyRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.WasteContainerRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.ZoneRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.WasteContainerDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.WasteContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/waste-containers")
public class WasteContainerController {

    @Autowired
    private WasteContainerRepository wasteContainerRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @GetMapping("/all")
    public List<WasteContainerDTO> listAllWasteContainers() {
        return wasteContainerRepository
                .findAll()
                .stream()
                .map(WasteContainerDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{wasteContainerId}")
    public WasteContainerDTO findByID(@PathVariable int wasteContainerId) {
        Optional<WasteContainer> wasteContainerOptional = wasteContainerRepository.findById(wasteContainerId);

        if (!wasteContainerOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new WasteContainerDTO(wasteContainerOptional.get());
    }

    @Secured("hasAny(DIRECTOR,ADMIN)")
    @PostMapping("/create")
    public void createWasteContainer(@RequestBody WasteContainerDTO wasteContainerDTO) {
        WasteContainer wasteContainer = new WasteContainer();

        wasteContainer.setAddress(wasteContainerDTO.getAddress());
        wasteContainer.setLatitude(wasteContainerDTO.getLatitude());
        wasteContainer.setLongitude(wasteContainerDTO.getLongitude());

        if (wasteContainer.getCompany() != null) {
            wasteContainer.setCompany(companyRepository.findById(wasteContainerDTO.getCompany().getId()).get());
        }
        if (wasteContainer.getZone() != null) {
            wasteContainer.setZone(zoneRepository.findById(wasteContainerDTO.getZone().getId()).get());
        }

        wasteContainerRepository.save(wasteContainer);
    }

    @Secured("hasAny(DIRECTOR,ADMIN)")
    @PutMapping("/{id}")
    public void updateWasteContainer(@RequestBody WasteContainerDTO wasteContainerDTO, @PathVariable int id) {
        Optional<WasteContainer> optionalWasteContainer = wasteContainerRepository.findById(id);

        if (!optionalWasteContainer.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        WasteContainer wasteContainer = optionalWasteContainer.get();

        wasteContainer.setAddress(wasteContainerDTO.getAddress());
        wasteContainer.setLatitude(wasteContainerDTO.getLatitude());
        wasteContainer.setLongitude(wasteContainerDTO.getLongitude());

        if (wasteContainer.getCompany() != null) {
            wasteContainer.setCompany(companyRepository.findById(wasteContainerDTO.getCompany().getId()).get());
        }
        if (wasteContainer.getZone() != null) {
            wasteContainer.setZone(zoneRepository.findById(wasteContainerDTO.getZone().getId()).get());
        }

        wasteContainerRepository.save(wasteContainer);
    }

    @Secured("hasAny(DIRECTOR,ADMIN)")
    @DeleteMapping("/{id}")
    public void deleteWasteContainer(@PathVariable int id) {
        Optional<WasteContainer> wasteContainer = wasteContainerRepository.findById(id);

        if (!wasteContainer.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        wasteContainerRepository.delete(wasteContainer.get());
    }
}
