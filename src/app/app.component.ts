/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ApplicationSettings } from '@app/core/general/application-settings';
import { ApplicationSettingsService } from '@app/core/general/application-settings.service';


/**
 * This class represents the main application component.
 */
@Component({
  selector: 'emp-ng-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  private isDisplayVedaElectoralUI: boolean = false;

  constructor(private appSettingsService: ApplicationSettingsService) {}
    
  ngOnInit() {
    this.loadDisplayVedaElectoralUI();
  }


  get mainLogo() {
    if (this.isDisplayVedaElectoralUI) {
      return './assets/img/customer/main.logo.veda.png';
    }
  
    return './assets/img/customer/main.logo.png';
  }


  get secondaryLogo() {
    if (this.isDisplayVedaElectoralUI) {
      return './assets/img/customer/secondary.logo.veda.png';
    }
    
    return './assets/img/customer/secondary.logo.png';
  }


  get advertisementImage() {
    if (this.isDisplayVedaElectoralUI) {
      return './assets/img/customer/advertisement.veda.jpg';
    }
    
    return './assets/img/customer/advertisement.jpg';
  }

  // private methods

  private async loadDisplayVedaElectoralUI() {
    let settings :ApplicationSettings = <ApplicationSettings>await this.appSettingsService.getApplicationSettings();    
    this.isDisplayVedaElectoralUI = settings.get<boolean>("displayVedaElectoralUI");
  }

}
