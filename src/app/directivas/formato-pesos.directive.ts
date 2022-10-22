import { Directive, HostListener, Self, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Directive({
  selector: 'input[formatoPesos]',
})
export class FormatoPesosDirective  implements OnDestroy {

  private formatter: Intl.NumberFormat;
  private destroy$ = new Subject();

  constructor(@Self() private ngControl: NgControl) {
    this.formatter = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });
  }

  ngAfterViewInit() {
    this.setValue(this.formatPrice(this.ngControl.value))
    this.ngControl
      .control
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.updateValue.bind(this));
  }

  updateValue(value) {
    let inputVal = value || '';
    this.setValue(!!inputVal ?
      this.validateDecimalValue(inputVal.replace(/[^0-9.]/g, '')) : '');
  }

  @HostListener('focus') onFocus() {
    this.setValue(this.unformatValue(this.ngControl.value));
  }

  @HostListener('blur') onBlur() {
    let value = this.ngControl.value || '';
    !!value && this.setValue(this.formatPrice(value));
  }

  formatPrice(v) {
    return this.formatter.format(v);
  }

  unformatValue(v) {
    return v.toString().replace(/\./g,'');
  }

  validateDecimalValue(v) {
    if (Number.isNaN(Number(v))) {
      const strippedValue = v.slice(0, v.length - 1);
      return Number.isNaN(Number(strippedValue)) ? '' : strippedValue;
    }
    return v;
  }

  setValue(v) {
    this.ngControl.control.setValue(v, { emitEvent: false })
  }

  ngOnDestroy() {
    this.setValue(this.unformatValue(this.ngControl.value));
    this.destroy$.next();
    this.destroy$.complete();
  }

}