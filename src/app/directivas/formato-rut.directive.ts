import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from "@angular/core";
import { rutFormat } from "../helpers/rut.validator";

@Directive({
  selector: "input[soloRut]",
})
export class FormatoRutDirective {
  @Output() valueChange = new EventEmitter();
  constructor(private _el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    let newValue = initalValue.replace(/[^0-9.^-kK]*/g, "");
    if (newValue.length > 4) newValue = rutFormat(newValue);
    this._el.nativeElement.value = newValue;

    this.valueChange.emit(newValue);
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
