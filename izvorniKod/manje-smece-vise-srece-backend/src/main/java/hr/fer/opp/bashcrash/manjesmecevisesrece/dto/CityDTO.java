package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.City;

public class CityDTO {

    private Integer id;
    private String cityName;
    private CountryDTO country;

    public CityDTO(Integer id, String cityName, CountryDTO country) {
        this.id = id;
        this.cityName = cityName;
        this.country = country;
    }

    public CityDTO(City cityModel) {
        this(cityModel.getId(), cityModel.getCityName(), new CountryDTO(cityModel.getCountry()));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}
