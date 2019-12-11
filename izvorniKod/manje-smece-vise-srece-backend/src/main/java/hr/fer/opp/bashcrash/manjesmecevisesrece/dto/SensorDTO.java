package hr.fer.opp.bashcrash.manjesmecevisesrece.dto;

import hr.fer.opp.bashcrash.manjesmecevisesrece.model.Sensor;

public class SensorDTO {

    private Integer id;
    private WasteContainerDTO wasteContainer;
    private String token;

    public SensorDTO(Integer id, WasteContainerDTO wasteContainer, String token) {
        this.id = id;
        this.wasteContainer = wasteContainer;
        this.token = token;
    }

    public SensorDTO(Sensor sensorModel) {
        this(sensorModel.getId(), new WasteContainerDTO(sensorModel.getWasteContainer()), sensorModel.getToken());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public WasteContainerDTO getWasteContainer() {
        return wasteContainer;
    }

    public void setWasteContainer(WasteContainerDTO wasteContainer) {
        this.wasteContainer = wasteContainer;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
