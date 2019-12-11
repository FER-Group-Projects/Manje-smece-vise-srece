package hr.fer.opp.bashcrash.manjesmecevisesrece.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private int cleannessGrade;

    @Column(nullable = false)
    private int tidinessGrade;

    private String comment;

    private String imageLink;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime postedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "waste_container_id", nullable = false)
    private WasteContainer wasteContainer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getCleannessGrade() {
        return cleannessGrade;
    }

    public void setCleannessGrade(int cleannessGrade) {
        this.cleannessGrade = cleannessGrade;
    }

    public int getTidinessGrade() {
        return tidinessGrade;
    }

    public void setTidinessGrade(int tidinessGrade) {
        this.tidinessGrade = tidinessGrade;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public WasteContainer getWasteContainer() {
        return wasteContainer;
    }

    public void setWasteContainer(WasteContainer wasteContainer) {
        this.wasteContainer = wasteContainer;
    }

}
