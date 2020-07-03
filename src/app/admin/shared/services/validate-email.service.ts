import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FormControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

@Injectable()
export class ValidateEmailService implements AsyncValidator {
  constructor(private auth: AuthService) {}

  async validate(control: FormControl): Promise<ValidationErrors | null> {
    if (control.hasError('email')) {
      return null;
    }

    return this.auth
      .checkEmailExists(control.value)
      .pipe(
        debounceTime(200),
        map((isExists: boolean) => (isExists ? { isExists } : null))
      )
      .toPromise();
  }
}
