import { Pipe, PipeTransform } from "@angular/core";
import { TiposRegion } from "../models/tipos/TiposRegion.model";

@Pipe({
  name: "pipaRegion",
})
export class PipaRegionPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return "";
    return TiposRegion.some((cadaRegion) => cadaRegion.id == value)
      ? TiposRegion.find((cadaRegion) => cadaRegion.id == value).nombre
      : "";
  }
}
