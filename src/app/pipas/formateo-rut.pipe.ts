import { Pipe, PipeTransform } from "@angular/core";
import { construirRut } from "../helpers/rut.validator";

@Pipe({
  name: "formateoRut",
})
export class FormateoRutPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    return construirRut(value);
  }
}
