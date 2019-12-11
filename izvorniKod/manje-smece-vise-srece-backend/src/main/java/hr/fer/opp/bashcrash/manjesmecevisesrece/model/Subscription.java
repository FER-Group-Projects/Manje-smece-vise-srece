package hr.fer.opp.bashcrash.manjesmecevisesrece.model;

import javax.persistence.*;

@Entity
public class Subscription {

    @EmbeddedId
    private SubscriptionKey id;

    @ManyToOne
    @MapsId("waste_container_id")
    @JoinColumn(name = "waste_container_id")
    private WasteContainer wasteContainer;

    @ManyToOne
    @MapsId("author_id")
    @JoinColumn(name = "author_id")
    private UserModel author;

}
