import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ValidateEmailService } from '../shared/services/validate-email.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

function validatePasswordsMatch(
  control: FormControl
): { passwordsMatch: false } | null {
  if (!control.parent) {
    return null;
  }
  const confirmPassword = control.value;
  const password = control.parent.value.password;

  if (confirmPassword != password) {
    return { passwordsMatch: false };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  registerForm: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    // private validateEmailService: ValidateEmailService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      email: [
        null,
        [
          Validators.minLength(3),
          Validators.maxLength(320),
          Validators.required,
          Validators.email,
        ],
        // [this.validateEmailService],
      ],
      // firstName: [
      //   null,
      //   [
      //     Validators.minLength(2),
      //     Validators.maxLength(40),
      //     Validators.required,
      //   ],
      // ],
      // lastName: [
      //   null,
      //   [
      //     Validators.minLength(2),
      //     Validators.maxLength(40),
      //     Validators.required,
      //   ],
      // ],
      password: [
        null,
        [
          Validators.minLength(6),
          Validators.maxLength(128),
          Validators.required,
        ],
      ],
      confirmPassword: [
        null,
        [validatePasswordsMatch, Validators.minLength(6), Validators.required],
      ],
    });
    this.registerForm.valueChanges.subscribe((_) =>
      console.log(this.registerForm.controls.email)
    );
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registerAgain']) {
        this.message = 'Please enter data';
      } else if (params['authFailed']) {
        this.message = 'Session expired. Enter values again';
      }
    });
  }
  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.submitted = true;
    const { confirmPassword: _, ...userDto } = this.registerForm.value;

    // this.authService.register(userDto).subscribe((data) => console.log(data));
    this.auth.register(userDto).subscribe(
      () => {
        this.formDirective.resetForm();
        this.router.navigate(['/admin', 'login']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
