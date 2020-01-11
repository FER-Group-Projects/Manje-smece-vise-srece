package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Company;

public class CompanyDTO {

    private Integer id;
    private UserDTO director;
    private String companyName;
    private String description;

    public CompanyDTO(Integer id, UserDTO director, String companyName, String description) {
        this.id = id;
        this.director = director;
        this.companyName = companyName;
        this.description = description;
    }

    public CompanyDTO(Company companyModel) {
        this(companyModel.getId(), new UserDTO(companyModel.getDirector()), companyModel.getCompanyName(), companyModel.getDescription());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserDTO getDirector() {
        return director;
    }

    public void setDirector(UserDTO director) {
        this.director = director;
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
}
