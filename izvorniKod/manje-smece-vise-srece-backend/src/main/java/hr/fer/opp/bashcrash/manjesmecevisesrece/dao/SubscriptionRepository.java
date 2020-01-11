package hr.fer.opp.bashcrash.manjesmecevisesrece.dao;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Subscription;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.SubscriptionKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionKey> {
}
