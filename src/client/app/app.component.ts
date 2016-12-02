import { Component } from '@angular/core';
import { Config } from './shared/index';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'empiria-land',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
