package hr.fer.opp.bashcrash.manjesmecevisesrece.model;

import javax.persistence.*;

@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "director_id", nullable = false)
    private UserModel director;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserModel getDirector() {
        return director;
    }

    public void setDirector(UserModel director) {
        this.director = director;
    }
}
