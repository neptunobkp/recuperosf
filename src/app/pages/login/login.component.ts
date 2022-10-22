import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { first } from "rxjs/operators";
import { AutenticacionService } from "src/app/services/autenticacion.service";
import { AlertaService } from "src/app/services/alerta.service";
import { AutorizacionService } from "src/app/services/autorizacion.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private autorizacionService: AutorizacionService,
    private alertaService: AlertaService,
    private _snackBar: MatSnackBar
  ) {
    if (this.autenticacionService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.subscription = this.alertaService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case "success":
          break;
        case "error":
          this._snackBar.open(message, "error", {
            duration: 2000,
          });
          break;
      }
    });

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.autorizacionService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.autenticacionService
            .whoIam()
            .pipe(first())
            .subscribe((usuario) => {
              this.router.navigate([this.returnUrl]);
            });
        },
        (error) => {
          this._snackBar.open("credenciales no válidas", "error", {
            duration: 2000,
          });
          this.loading = false;
        }
      );
  }
}
