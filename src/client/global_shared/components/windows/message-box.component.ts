import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'message-box',
 // outputs: ['onClose'],
  templateUrl: 'message-box.component.html',
  styleUrls : ['message-box.component.css']
})
export class MessageBoxComponent {

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  private visible: boolean = false;

  public showException(e: Error): void {
    this.visible = true;
    window.alert(e.message);
  }

  public showMessage(message: string) {
    this.visible = false;
    window.alert(message);
  }

  public close() {
    this.visible = false;
    this.onClose.next(null);    // ToDo: How to return void?
  }

}  // class MessageBoxComponent
