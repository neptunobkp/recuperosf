import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AutorizacionService {
  private currentTokenSubject: BehaviorSubject<String>;
  public currentUser: Observable<String>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<String>(
      localStorage.getItem("userToken")
    );
    this.currentUser = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): String {
    return this.currentTokenSubject.value;
  }

  login(username: string, password: string) {
    var data =
      "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",
      "No-Auth": "True",
    });

    return this.http
      .post<any>(`${environment.apiUrl}`.replace("api", "token"), data, {
        headers: reqHeader,
      })
      .pipe(
        map((user: any) => {
          localStorage.setItem("userToken", user.access_token);
          this.currentTokenSubject.next(user.access_token);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    this.currentTokenSubject.next(null);
  }
}
