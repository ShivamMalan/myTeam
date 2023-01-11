import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'tm-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() name = "Click";
  @Input() width = "124";
  @Input() height= "36";
  @Input() class="submit";
  @Input() type="button";
  @Input()control: FormControl | undefined;
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  onClick() {
    console.log(`The rating was clicked!`);
  }
}
