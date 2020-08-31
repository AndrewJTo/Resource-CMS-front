import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {AppConfigService} from './app-config.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private configService: AppConfigService, private title: Title) {
	}

  ngOnInit(): void {
		this.configService.getTitle().subscribe(t => {
			this.title.setTitle(t)
			this.configService.siteTitle = t
		})
	}
}
