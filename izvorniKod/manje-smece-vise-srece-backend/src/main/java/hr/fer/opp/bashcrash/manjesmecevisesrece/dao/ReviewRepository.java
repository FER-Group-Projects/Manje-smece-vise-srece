package hr.fer.opp.bashcrash.manjesmecevisesrece.dao;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> getAllByWasteContainer_IdOrderByPostedAtDesc(int wasteContainerId);

}
