import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {Page} from '../page';
import {PageService} from '../page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent{
	page: Page;
	allowEditing = false
	notFound = true
  
	constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private pageService: PageService) { }

	getPage(title: string):void {
		console.log("loading page: " + title);
		this.pageService.getPage(title).subscribe(page => {
			if(page.page_title == null){
				this.page = {page_title: "Error", page_text: "Page not found", permissions: {all_users_view: true}}
			} else {
				this.notFound = false
				this.page = page
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
