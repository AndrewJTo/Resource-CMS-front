import { Component, OnInit } from '@angular/core';
import {User, Group, UserSession} from '../user';
import {Link, SiteConfig} from '../links';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../page'
import {UserService} from '../user.service'
import {AppConfigService} from '../app-config.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
	user: User = {id: "", creation_date: 0, first_name: "", last_name: ""}
	group: Group = {id: "",	group_name: "", write_resources: false,	write_pages: false,	user_admin: false, site_admin: false, sudo: false}
	sideBar: SiteConfig = {Title: "", Links:[]}
	showSettings = true
	title: string 

  constructor(private userService: UserService, private configService: AppConfigService, private router: Router) {
	}

  ngOnInit(): void {
		this.userService.getSession().subscribe(response => {
			this.getUserInfo(response)
			this.userService.curSession = response
		})
		this.configService.getConfig().subscribe(response => {this.sideBar = response; this.title = response.Title})
  }

	getUserInfo(session: UserSession): void {
		console.log("Got session response response")
		if (session == null){
			console.log("Site error: Not logged in!")
			this.router.navigate(['login'])
			return
		}
		this.user = session.user
		this.group = session.group
	}

	logout() {
		this.userService.logout().subscribe(_ => {this.router.navigate(['login'])})
	}

}
