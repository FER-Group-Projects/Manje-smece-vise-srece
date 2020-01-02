package hr.fer.opp.bashcrash.manjesmecevisesrece.rest;

import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.CompanyRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.WasteContainerRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.dao.ZoneRepository;
import hr.fer.opp.bashcrash.manjesmecevisesrece.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class WasteContainerControllerTest {

    private WasteContainerRepository wasteContainerRepository;
    private CompanyRepository companyRepository;
    private ZoneRepository zoneRepository;
    private WasteContainerController wasteContainerController;

    private int EXISTING_WASTE_CONTAINER_ID = 1;
    private int NON_EXISTANT_WASTE_CONTAINER_ID = 5;

    @BeforeEach
    void setUp() {
        wasteContainerRepository = Mockito.mock(WasteContainerRepository.class);
        companyRepository = Mockito.mock(CompanyRepository.class);
        zoneRepository = Mockito.mock(ZoneRepository.class);

        wasteContainerController = new WasteContainerController(wasteContainerRepository, companyRepository, zoneRepository);

        WasteContainer wasteContainer = new WasteContainer();
        Company company = new Company();
        company.setDirector(new UserModel());

        City city = new City();
        city.setCountry(new Country());
        Zone zone = new Zone();
        zone.setCity(city);

        wasteContainer.setCompany(company);
        wasteContainer.setZone(zone);

        when(wasteContainerRepository.findById(EXISTING_WASTE_CONTAINER_ID))
                .thenReturn(Optional.of(wasteContainer));

        when(wasteContainerRepository.findById(NON_EXISTANT_WASTE_CONTAINER_ID))
                .thenReturn(Optional.empty());
    }

    @Test
    void testFetchingInformationAboutExistingWasteContainer() {
        wasteContainerController.findByID(EXISTING_WASTE_CONTAINER_ID);

        // Verify interaction with database
        verify(wasteContainerRepository, times(1))
                .findById(EXISTING_WASTE_CONTAINER_ID);
    }

    @Test
    void testFetchingInformationAboutNonExistantWasteContainer() {
        assertThrows(Exception.class,
                () -> wasteContainerController.findByID(NON_EXISTANT_WASTE_CONTAINER_ID));

        // Verify interaction with database
        verify(wasteContainerRepository, times(1))
                .findById(NON_EXISTANT_WASTE_CONTAINER_ID);
    }

}