/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

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
