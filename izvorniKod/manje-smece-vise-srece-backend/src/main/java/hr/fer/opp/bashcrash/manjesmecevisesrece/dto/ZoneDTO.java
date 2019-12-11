package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Zone;

public class ZoneDTO {

    private Integer id;
    private String zoneName;
    private CityDTO city;

    public ZoneDTO(Integer id, String zoneName, CityDTO city) {
        this.id = id;
        this.zoneName = zoneName;
        this.city = city;
    }

    public ZoneDTO(Zone zoneModel) {
        this(zoneModel.getId(), zoneModel.getZoneName(), new CityDTO(zoneModel.getCity()));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
    }

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

}
