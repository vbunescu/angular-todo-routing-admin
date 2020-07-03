import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertService } from './shared/services/alert.service';
import { ValidateEmailService } from './shared/services/validate-email.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'register', component: RegisterComponent },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'todo/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService, ValidateEmailService],
})
export class AdminModule {}
