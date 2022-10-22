import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "input[soloNumeros]",
})
export class SoloNumerosDirective {
  @Output() valueChange = new EventEmitter();
  constructor(private _el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    const newValue = initalValue.replace(/[^0-9]*/g, "");
    this._el.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
