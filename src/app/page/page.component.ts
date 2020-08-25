import { Component, Input, OnInit } from '@angular/core';
import {Page} from '../page';
import {PageService} from '../page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent{
	page: Page;
  
	constructor(private route: ActivatedRoute, private pageService: PageService) { }

	getPage(title: string):void {
		console.log("loading page: " + title);
		this.pageService.getPage(title).subscribe(page => this.page = page);
	}

	ngOnInit (): void {
		this.route.params.subscribe(params => this.getPage(params['page_title']));
	}
}
