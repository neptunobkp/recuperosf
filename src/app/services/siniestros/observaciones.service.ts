import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ObservacionesService {
  private subject = new Subject<void>();
  constructor() {}

  gets(): Observable<any> {
    return this.subject.asObservable();
  }

  refrescar() {
    this.subject.next();
  }
}
