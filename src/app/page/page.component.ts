import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef, Compiler, NgModule, Injector, NgModuleRef } from '@angular/core';
import {Page} from '../page';
import {PageService} from '../page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service'
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
	//template: 'I am A component that inserts dynamic B component below: <mat-card>Test Card</mat-card><div #vc></div>',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent{

	@ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

	page: Page;
	allowEditing = false
	notFound = true
  
	constructor(private _compiler: Compiler, private _injector: Injector,  private _m: NgModuleRef<any>, private router: Router, private userService: UserService, private route: ActivatedRoute, private pageService: PageService) { }

	getPage(title: string):void {
		console.log("loading page: " + title);
		this.pageService.getPage(title).subscribe(page => {
			if(page.page_title == null){
				this.page = {page_title: "Error", page_text: "Page not found", permissions: {all_users_view: true}}
			} else {
				this.notFound = false
				this.page = page
				//Ensure that local page anchor links work
				var url = this.router.url.split("#")[0]
				this.page.page_text = this.page.page_text.replace(/href="#/g, 'href="' + url + '#')
				console.log("Setting up page")
				console.log(this.vc)
				const template = "asd<mat-card>Dynamic Component </mat-card><div [innerHTML]='text'>"
				const tmpCmp = Component({template: template})(class {})
				const tmpModule = NgModule({declarations: [tmpCmp], imports: [MatCardModule]})(class {})

				this._compiler.compileModuleAndAllComponentsAsync(tmpModule).then((factories) => {
					const f = factories.componentFactories[0]
					const cmpRef = this.vc.createComponent(f)
					cmpRef.instance.text = this.page.page_text
				})
			}

		})
	}

	edit(): void {
		if (this.notFound) {
			this.router.navigateByUrl("/app/settings/page")
		} else {
			this.router.navigateByUrl("/app/settings/page/" + this.page.page_title)
		}
	}

	ngOnInit (): void {
		this.route.params.subscribe(params => this.getPage(params['page_title']));
		if(this.userService.curSession == null){
			this.userService.getSession().subscribe(s => {
				this.userService.curSession = s
				if(this.userService.curSession.group.site_admin){
					this.allowEditing = true
				}
			})
		} else {
			if(this.userService.curSession.group.site_admin){
				this.allowEditing = true
			}
		}
	}
}
