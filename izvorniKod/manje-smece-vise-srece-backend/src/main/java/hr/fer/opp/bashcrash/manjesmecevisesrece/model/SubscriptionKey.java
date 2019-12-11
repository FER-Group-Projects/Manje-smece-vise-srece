package hr.fer.opp.bashcrash.manjesmecevisesrece.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class SubscriptionKey implements Serializable {

    @Column(name = "author_id")
    private int authorId;

    @Column(name = "waste_container_id")
    private int wasteContainerId;

    public SubscriptionKey(int authorId, int wasteContainerId) {
        this.authorId = authorId;
        this.wasteContainerId = wasteContainerId;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getWasteContainerId() {
        return wasteContainerId;
    }

    public void setWasteContainerId(int wasteContainerId) {
        this.wasteContainerId = wasteContainerId;
    }

}
