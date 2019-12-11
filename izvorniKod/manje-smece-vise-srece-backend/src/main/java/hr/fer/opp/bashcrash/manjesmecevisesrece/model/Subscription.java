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

    public SubscriptionKey getId() {
        return id;
    }

    public void setId(SubscriptionKey id) {
        this.id = id;
    }

    public WasteContainer getWasteContainer() {
        return wasteContainer;
    }

    public void setWasteContainer(WasteContainer wasteContainer) {
        this.wasteContainer = wasteContainer;
    }

    public UserModel getAuthor() {
        return author;
    }

    public void setAuthor(UserModel author) {
        this.author = author;
    }
}
