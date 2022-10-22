import { Pipe, PipeTransform } from "@angular/core";
import { TiposCompania } from "../models/tipos/TiposCompania.model";

@Pipe({
  name: "pipaCompania",
})
export class PipaCompaniaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return "";
    return TiposCompania.some((cadaRegion) => cadaRegion.id == value)
      ? TiposCompania.find((cadaRegion) => cadaRegion.id == value).nombre
      : "";
  }
}
