import {Routes} from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './account/register/register.component';
import {ForgottenPwdComponent} from './account/forgotten-pwd/forgotten-pwd.component';
import {ChangePwdComponent} from './account/change-pwd/change-pwd.component';
import {AuthorizationOnlineService} from './services-api/authorization-online.service';
import {ManageLinkComponent} from './link/manage-link/manage-link.component';


/**
 * Routing of the application
 */
export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthorizationOnlineService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotPwd', component: ForgottenPwdComponent},
  {path: 'newPwd', component: ChangePwdComponent},
  {path: 'newLink', component: ManageLinkComponent},
  {path: 'editLink/:linkId', component: ManageLinkComponent}
];
