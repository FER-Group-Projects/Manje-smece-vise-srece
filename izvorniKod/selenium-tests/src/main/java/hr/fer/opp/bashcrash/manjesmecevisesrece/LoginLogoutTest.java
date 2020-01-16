package hr.fer.opp.bashcrash.manjesmecevisesrece;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class LoginLogoutTest {

    private static ChromeDriver driver;

    private static final String URL = "https://manje-smece-vise-srece.herokuapp.com/";

    @BeforeClass
    public static void openBrowser(){
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @Test
    public void testLoginLogout() {
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

        // Odjava
        // 5.
        driver.findElementByCssSelector(".dropdown-toggle.nav-link").click();
        driver.findElementByLinkText("Postavke");
        driver.findElementByLinkText("Odjava");

        // 6.
        driver.findElementByLinkText("Odjava").click();
    }

    @AfterClass
    public static void closeBrowser(){
        driver.quit();
    }

}
