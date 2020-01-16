package hr.fer.opp.bashcrash.manjesmecevisesrece;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class PersonalDataTest {

    private static ChromeDriver driver;

    private static final String URL = "https://manje-smece-vise-srece.herokuapp.com/";

    @BeforeClass
    public static void openBrowser(){
    	
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @Test
    public void testPersonalData() {
        // 1.
        driver.get(URL);

        // Prijava
        // 2.
        driver.findElementByCssSelector(".dropdown-toggle.nav-link").click();
        driver.findElementByLinkText("Prijava");
        driver.findElementByLinkText("Registracija");

        // 3.
        driver.findElementByLinkText("Prijava").click();
        driver.findElementById("username");
        driver.findElementById("password");

        // 4.
        driver.findElementById("username").sendKeys("korisnik");
        driver.findElementById("password").sendKeys("korisnik_lozinka");
        driver.findElementByCssSelector("input[type=submit]").click();
		
		//5. Osobni podaci
      	driver.findElementByCssSelector(".dropdown-toggle.nav-link").click();
        driver.findElementByLinkText("korisnik");
        driver.findElementByLinkText("Postavke");
        driver.findElementByLinkText("Odjava");
      		
      	//6.Provjera
      	driver.findElementByLinkText("korisnik").click();
      	driver.findElementByName("UserName");
      	driver.findElementByName("Email");
      	driver.findElementByName("Password");

        // Odjava
        // 7.
        driver.findElementByCssSelector(".dropdown-toggle.nav-link").click();
        driver.findElementByLinkText("Postavke");
        driver.findElementByLinkText("Odjava");

        // 8.
        driver.findElementByLinkText("Odjava").click();
    }

    @AfterClass
    public static void closeBrowser(){
        driver.quit();
    }

}