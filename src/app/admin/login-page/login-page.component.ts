import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  loginForm: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter data';
      } else if (params['authFailed']) {
        this.message = 'Session expired. Enter values again';
      }
    });
  }
  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.formDirective.resetForm();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
