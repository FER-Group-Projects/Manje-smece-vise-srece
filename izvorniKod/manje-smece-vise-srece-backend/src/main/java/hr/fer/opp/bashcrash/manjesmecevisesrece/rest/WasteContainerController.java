package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.*;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.WasteContainerDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.WasteContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/waste-containers")
public class WasteContainerController {

    private UserRepository userRepository;
    private WasteContainerRepository wasteContainerRepository;
    private CompanyRepository companyRepository;
    private ZoneRepository zoneRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public WasteContainerController(UserRepository userRepository, WasteContainerRepository wasteContainerRepository, CompanyRepository companyRepository, ZoneRepository zoneRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.wasteContainerRepository = wasteContainerRepository;
        this.companyRepository = companyRepository;
        this.zoneRepository = zoneRepository;
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("/all")
    public List<WasteContainerDTO> listAllWasteContainers() {
        return wasteContainerRepository
                .findAll()
                .stream()
                .map(WasteContainerDTO::new)
                .map(dto -> {
                    double grade =
                            reviewRepository
                                    .getAllByWasteContainer_Id(dto.getId())
                                    .stream()
                                    .mapToDouble(r -> (r.getTidinessGrade() + r.getCleannessGrade()) / 2.0)
                                    .average()
                                    .orElse(0);

                    dto.setGrade(grade);

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{wasteContainerId}")
    public WasteContainerDTO findByID(@PathVariable int wasteContainerId) {
        Optional<WasteContainer> wasteContainerOptional = wasteContainerRepository.findById(wasteContainerId);

        if (!wasteContainerOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        double grade =
                reviewRepository
                .getAllByWasteContainer_Id(wasteContainerId)
                .stream()
                .mapToDouble(r -> (r.getTidinessGrade() + r.getCleannessGrade()) / 2.0)
                .average()
                .orElse(0);

        WasteContainerDTO wasteContainerDTO = new WasteContainerDTO(wasteContainerOptional.get());

        wasteContainerDTO.setGrade(grade);

        return wasteContainerDTO;
    }

    @Secured({"ROLE_DIRECTOR", "ROLE_ADMIN"})
    @PostMapping("/create")
    public void createWasteContainer(@RequestBody WasteContainerDTO wasteContainerDTO, @AuthenticationPrincipal Principal principal) {
        String loggedInUsername = principal.getName();

        UserModel userModel = userRepository.findByUsername(loggedInUsername);

        if (userModel == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        WasteContainer wasteContainer = new WasteContainer();

        wasteContainer.setAddress(wasteContainerDTO.getAddress());
        wasteContainer.setLatitude(wasteContainerDTO.getLatitude());
        wasteContainer.setLongitude(wasteContainerDTO.getLongitude());
        wasteContainer.setCompany(userModel.getCompany());

        if (wasteContainer.getZone() != null) {
            wasteContainer.setZone(zoneRepository.findById(wasteContainerDTO.getZone().getId()).get());
        }
        else {
            wasteContainer.setZone(zoneRepository.findAll().get(0));
        }

        wasteContainerRepository.save(wasteContainer);
    }

    @Secured({"ROLE_DIRECTOR", "ROLE_ADMIN"})
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

        wasteContainerRepository.save(wasteContainer);
    }

    @Secured({"ROLE_DIRECTOR", "ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    public void deleteWasteContainer(@PathVariable int id) {
        Optional<WasteContainer> wasteContainer = wasteContainerRepository.findById(id);

        if (!wasteContainer.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        wasteContainerRepository.delete(wasteContainer.get());
    }
}
