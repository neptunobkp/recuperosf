import { Pipe, PipeTransform } from '@angular/core';
import { TiposDano } from '../models/tipos/TiposDano.model';

@Pipe({
  name: 'pipaDano'
})
export class PipaDanoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return "";
    return TiposDano.some((cadaRegion) => cadaRegion.id == value)
      ? TiposDano.find((cadaRegion) => cadaRegion.id == value).nombre
      : "";
  }

}
