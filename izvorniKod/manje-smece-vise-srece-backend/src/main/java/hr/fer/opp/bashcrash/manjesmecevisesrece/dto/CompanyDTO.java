package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Company;

public class CompanyDTO {

    private Integer id;
    private UserDTO directory;
    private String companyName;
    private String description;

    public CompanyDTO(Integer id, UserDTO directory, String companyName, String description) {
        this.id = id;
        this.directory = directory;
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

    public UserDTO getDirectory() {
        return directory;
    }

    public void setDirectory(UserDTO directory) {
        this.directory = directory;
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
