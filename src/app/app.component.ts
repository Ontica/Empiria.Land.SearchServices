import { Component } from '@angular/core';
import { APP_SETTINGS } from './empiria.config';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public get mainLogo() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/images/customer/main.logo.veda.png';
    }
    return './assets/images/customer/main.logo.png';
  }


  public get secondaryLogo() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/images/customer/secondary.logo.veda.png';
    }
    return './assets/images/customer/secondary.logo.png';
  }


  public get advertisementImage() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/images/customer/honestidad.veda.jpg';
    }
    return './assets/images/customer/honestidad.jpg';
  }

}
