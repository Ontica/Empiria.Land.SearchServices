/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { APP_SETTINGS } from '../assets/empiria.config';


/**
 * This class represents the main application component.
 */
@Component({
  selector: 'emp-ng-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  get mainLogo() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/img/customer/main.logo.veda.png';
    }
    return './assets/img/customer/main.logo.png';
  }


  get secondaryLogo() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/img/customer/secondary.logo.veda.png';
    }
    return './assets/img/customer/secondary.logo.png';
  }


  get advertisementImage() {
    if (APP_SETTINGS.displayVedaElectoralUI) {
      return './assets/img/customer/advertisement.veda.jpg';
    }
    return './assets/img/customer/advertisement.jpg';
  }

}
