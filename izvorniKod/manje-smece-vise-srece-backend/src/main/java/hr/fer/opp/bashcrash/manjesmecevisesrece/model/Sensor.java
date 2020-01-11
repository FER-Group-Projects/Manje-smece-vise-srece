package hr.fer.opp.bashcrash.manjesmecevisesrece.model;

import javax.persistence.*;

@Entity
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    @JoinColumn(name = "waste_container_id", nullable = false)
    private WasteContainer wasteContainer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public WasteContainer getWasteContainer() {
        return wasteContainer;
    }

    public void setWasteContainer(WasteContainer wasteContainer) {
        this.wasteContainer = wasteContainer;
    }

}
