import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && value !== undefined && !isNaN(value) && value > 0) {
      return null;
    }
    return { positiveNumber: true };
  };
}