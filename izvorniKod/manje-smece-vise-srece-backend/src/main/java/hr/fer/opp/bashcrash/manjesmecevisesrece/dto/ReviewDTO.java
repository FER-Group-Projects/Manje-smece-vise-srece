package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Review;

import java.time.LocalDateTime;

public class ReviewDTO {

    private String author;
    private double grade;
    private String comment;
    private String imageLink;
    private LocalDateTime postedAt;

    public ReviewDTO(String author, double grade, String comment, String imageLink, LocalDateTime postedAt) {
        this.author = author;
        this.grade = grade;
        this.comment = comment;
        this.imageLink = imageLink;
        this.postedAt = postedAt;
    }

    public ReviewDTO(Review review) {
        this.author = review.getUser().getUsername();
        this.grade = (double) (review.getCleannessGrade() + review.getTidinessGrade()) / 2;
        this.comment = review.getComment();
        this.imageLink = review.getImageLink();
        this.postedAt = review.getPostedAt();
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
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
}
