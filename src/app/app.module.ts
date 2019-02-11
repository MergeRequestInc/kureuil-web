import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoginComponent} from './account/login/login.component';
import {AuthenticationService} from './services-api/authentication.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';
import {RegisterComponent} from './account/register/register.component';
import {UserService} from './services-api/user.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AuthExpiredInterceptor} from './services-common/interceptor/auth-expired.interceptor';
import {AuthInterceptor} from './services-common/interceptor/auth.interceptor';
import {ForgottenPwdComponent} from './account/forgotten-pwd/forgotten-pwd.component';
import {ChangePwdComponent} from './account/change-pwd/change-pwd.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import { ChannelsLeftMenuComponent } from './channels-left-menu/channels-left-menu.component';
import { ManageChannelComponent } from './modals/manage-channel/manage-channel.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ManageLinkComponent } from './link/manage-link/manage-link.component';
import { LinkItemComponent } from './link/link-item/link-item.component';
import { LinkListComponent } from './link/link-list/link-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ForgottenPwdComponent,
    ChangePwdComponent,
    ChannelsLeftMenuComponent,
    ManageChannelComponent,
    ManageLinkComponent,
    LinkItemComponent,
    LinkListComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgxWebstorageModule.forRoot(),
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    MenuModule,
    ButtonModule,
    VirtualScrollerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [ManageChannelComponent],
  providers: [
    AuthenticationService,
    HttpClient,
    UserService,
    NgbModalConfig,
    NgbModal,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
