package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.SensorRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.WasteContainerRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.SensorDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Sensor;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.WasteContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/sensors")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private WasteContainerRepository wasteContainerRepository;

    @GetMapping("/all")
    public List<SensorDTO> listAllSensors() {
        return sensorRepository
                .findAll()
                .stream()
                .map(SensorDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public SensorDTO findByID(@PathVariable int id) {
        Optional<Sensor> optionalSensor = sensorRepository.findById(id);

        if (!optionalSensor.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new SensorDTO(optionalSensor.get());
    }

    @GetMapping("/by-token/{token}")
    public SensorDTO findByToken(@PathVariable String token) {
        Optional<Sensor> optionalSensor = sensorRepository.findByToken(token);

        if (!optionalSensor.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new SensorDTO(optionalSensor.get());
    }

    @Secured("ROLE_DIRECTOR")
    @PostMapping("/create")
    public void createSensor(@RequestBody SensorDTO sensorDTO) {
        Sensor sensor = new Sensor();
        Optional<WasteContainer> optionalWasteContainer =
                wasteContainerRepository.findById(sensorDTO.getWasteContainer().getId());

        if (!optionalWasteContainer.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        sensor.setWasteContainer(optionalWasteContainer.get());
        sensor.setToken(UUID.randomUUID().toString().replace("-", ""));

        sensorRepository.save(sensor);
    }

    @Secured("ROLE_DIRECTOR")
    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable int id) {
        sensorRepository.deleteById(id);
    }

}
