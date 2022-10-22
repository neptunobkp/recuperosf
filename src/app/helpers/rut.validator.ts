import { FormGroup } from "@angular/forms";

// custom validator to check that two fields match
export function RutValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    // set error on matchingControl if validation fails
    if (control.value) {
      if (control.value.length > 7) {
        if (!rutValidate(control.value)) {
          control.setErrors({ rut: true });
        }
      } else {
        control.setErrors({ rut: true });
      }
    } else {
      control.setErrors(null);
    }
  };
}

export function rutClean(value: string) {
  if (typeof value === "string") {
    return value
      .replace(/[^0-9kK]+/g, "")
      .replace(/^0+/, "")
      .toUpperCase();
  }
  return "";
}

export function rutMantis(value: string): number {
  if (typeof value === "string") {
    const rut: string = rutClean(value);
    let rutDigits: number = parseInt(rut.slice(0, -1), 10);
    return rutDigits;
  }
  return null;
}

export function rutValidate(value: string) {
  if (typeof value !== "string") {
    return false;
  }

  const rut: string = rutClean(value);
  let rutDigits: number = parseInt(rut.slice(0, -1), 10);
  let m: number = 0;
  let s: number = 1;

  while (rutDigits > 0) {
    s = (s + (rutDigits % 10) * (9 - (m++ % 6))) % 11;
    rutDigits = Math.floor(rutDigits / 10);
  }
  const checkDigit: string = s > 0 ? String(s - 1) : "K";

  return checkDigit === rut.slice(-1);
}

export function rutFormat(value: string) {
  const rut: string = rutClean(value);

  if (rut.length <= 1) {
    return rut;
  }

  let result: string = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
  for (let i: number = 4; i < rut.length; i += 3) {
    result = `${rut.slice(-3 - i, -i)}.${result}`;
  }

  return result;
}

export function construirRut(rutVal) {
  if (!rutVal) return "";
  var rut = parseInt(rutVal);
  var M = 0,
    S = 1;
  for (; rut; rut = Math.floor(rut / 10))
    S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;

  var dv = S ? S - 1 : "k";
  return rutVal + "-" + dv;
}
