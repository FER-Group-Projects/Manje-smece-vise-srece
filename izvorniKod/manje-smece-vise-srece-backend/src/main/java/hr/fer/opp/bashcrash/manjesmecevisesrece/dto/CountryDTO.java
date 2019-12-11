package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Country;

public class CountryDTO {

    private Integer id;
    private String countryName;

    public CountryDTO(Integer id, String countryName) {
        this.id = id;
        this.countryName = countryName;
    }

    public CountryDTO(Country countryModel) {
        this(countryModel.getId(), countryModel.getCountryName());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

}
