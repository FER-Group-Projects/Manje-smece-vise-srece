package hr.fer.opp.bashcrash.manjesmecevisesrece.dao;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Integer> {

    Optional<Sensor> findByToken(String token);

}
