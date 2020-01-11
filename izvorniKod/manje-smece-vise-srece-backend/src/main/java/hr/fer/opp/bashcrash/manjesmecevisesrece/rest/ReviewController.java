package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.ReviewRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.UserRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.WasteContainerRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dto.ReviewDTO;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Review;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private UserRepository userRepository;
    private ReviewRepository reviewRepository;
    private WasteContainerRepository wasteContainerRepository;

    public ReviewController(UserRepository userRepository, ReviewRepository reviewRepository, WasteContainerRepository wasteContainerRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.wasteContainerRepository = wasteContainerRepository;
    }

    @GetMapping("/for-waste-container/{id}")
    public List<ReviewDTO> listAllReviewsForWasteContainer(@PathVariable("id") int id) {
        return reviewRepository
                .getAllByWasteContainer_Id(id)
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    @Secured("ROLE_USER")
    @PostMapping("/for-waste-container/{id}/create")
    public void createReview(@RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal Principal principal, @PathVariable("id") int id) {
        String loggedInUsername = principal.getName();
        UserModel userModel = userRepository.findByUsername(loggedInUsername);

        if (userModel == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Review review = new Review();

        review.setUser(userModel);
        review.setCleannessGrade((int) reviewDTO.getGrade());
        review.setTidinessGrade((int) reviewDTO.getGrade());
        review.setComment(reviewDTO.getComment());
        review.setImageLink(reviewDTO.getImageLink());
        review.setWasteContainer(wasteContainerRepository.findById(id).get());

        reviewRepository.save(review);
    }
}
