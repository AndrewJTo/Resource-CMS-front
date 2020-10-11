import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav'; 
import {MatToolbarModule } from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { SiteComponent } from './site/site.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DirlistComponent, DialogNewDir } from './dirlist/dirlist.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent, AdminDeleteDialog } from './admin/admin.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserSettingsComponent } from './usersettings/usersettings.component';
import {MatSelectModule} from '@angular/material/select';
import { SiteSettingsComponent, SiteSettingsDeleteDialog } from './site-settings/site-settings.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { AppConfigComponent } from './app-config/app-config.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LinksComponent } from './links/links.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ShowResourceComponent } from './show-resource/show-resource.component';
import { EventEditorComponent } from './event-editor/event-editor.component'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { CalendarComponent } from './calendar/calendar.component'
import {DatePipe} from '@angular/common'
import { FlexLayoutModule } from "@angular/flex-layout";
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';

export function createCompiler(compilerFactory: CompilerFactory) {
	return compilerFactory.createCompiler();
}
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    SiteComponent,
    LoginComponent,
    DirlistComponent,
    AdminComponent,
    UserSettingsComponent,
    SiteSettingsComponent,
		SiteSettingsDeleteDialog,
    PageEditorComponent,
    AppConfigComponent,
    LinksComponent,
		AdminDeleteDialog,
		SafeHtmlPipe,
		DialogNewDir,
		FileUploaderComponent,
		ShowResourceComponent,
		EventEditorComponent,
		CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		AppRoutingModule,
		MatCardModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatExpansionModule,
		MatSelectModule,
		MatSnackBarModule,
		MatDialogModule,
		DragDropModule,
		MatGridListModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FlexLayoutModule,
  ],
  providers: [
		Title,
		{provide: COMPILER_OPTIONS, useValue: {}, multi: true},
		{provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
		{provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
	],
  bootstrap: [
		AppComponent,
	]
})
export class AppModule { }
