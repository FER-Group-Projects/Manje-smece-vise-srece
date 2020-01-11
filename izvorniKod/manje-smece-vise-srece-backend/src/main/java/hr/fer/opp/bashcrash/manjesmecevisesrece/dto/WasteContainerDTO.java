package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.WasteContainer;

public class WasteContainerDTO {

    private Integer id;
    private CompanyDTO company;
    private ZoneDTO zone;
    private String address;
    private double latitude;
    private double longitude;
    private double grade;

    public WasteContainerDTO(Integer id, CompanyDTO company, ZoneDTO zone, String address, double latitude, double longitude, double grade) {
        this.id = id;
        this.company = company;
        this.zone = zone;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.grade = grade;
    }

    public WasteContainerDTO(WasteContainer wasteContainerModel) {
        this(wasteContainerModel.getId(), new CompanyDTO(wasteContainerModel.getCompany()), new ZoneDTO(wasteContainerModel.getZone()),
                wasteContainerModel.getAddress(), wasteContainerModel.getLatitude(), wasteContainerModel.getLongitude(), -1);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CompanyDTO getCompany() {
        return company;
    }

    public void setCompany(CompanyDTO company) {
        this.company = company;
    }

    public ZoneDTO getZone() {
        return zone;
    }

    public void setZone(ZoneDTO zone) {
        this.zone = zone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }
}
