import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SiteComponent} from './site/site.component';
import {LoginComponent} from './login/login.component'
import {PageComponent} from './page/page.component'
import {DirlistComponent} from './dirlist/dirlist.component'
import {AdminComponent} from './admin/admin.component'
import {UserSettingsComponent} from './usersettings/usersettings.component'
import {SiteSettingsComponent} from './site-settings/site-settings.component'
import {PageEditorComponent} from './page-editor/page-editor.component'
import {AppConfigComponent} from './app-config/app-config.component'
import {LinksComponent} from './links/links.component'
import {EventEditorComponent} from './event-editor/event-editor.component'
import {CalendarComponent} from './calendar/calendar.component'

const routes: Routes = [
	{ path: '', redirectTo: 'app/page/home', pathMatch:'full'},
	{ 
		path: 'app', component: SiteComponent, children:[
		{ path: 'page/:page_title', component: PageComponent},
		{ path: 'page', redirectTo: 'page/home', pathMatch: 'full' },
		{ path: 'dir', component: DirlistComponent, children:[{path: '**', component: DirlistComponent}] },
		{ path: 'settings/admin', component: AdminComponent},
		{ path: 'settings/user/:user_id', component: UserSettingsComponent},
		{ path: 'settings/site', component: SiteSettingsComponent},
		{ path: 'settings/page', component: PageEditorComponent},
		{ path: 'settings/page/:page_title', component: PageEditorComponent},
		{ path: 'settings/site/config', component: AppConfigComponent},
		{ path: 'settings/event', component: EventEditorComponent},
		{ path: 'settings/event/:eid', component: EventEditorComponent},
		{ path: 'links', component: LinksComponent},
		{ path: 'cal', component: CalendarComponent}
	]},
	{ path: 'login', component: LoginComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
