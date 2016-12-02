import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'modal-window',
  //inputs: ['visible'],
 // outputs: ['onClose'],
  templateUrl: 'modal-window.component.html',
  styleUrls: ['modal-window.component.css']
})
export class ModalWindowComponent {

   @Output() onClose: EventEmitter<any> = new EventEmitter();

   @Input() visible: boolean = false;

   public close() {
     this.visible = false;
     this.onClose.next(null);
   }

   public show() {
      this.visible = true;
   }

}  // class ModalWindowComponent
