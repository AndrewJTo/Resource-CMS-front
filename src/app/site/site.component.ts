import { ChangeDetectorRef, OnDestroy, Component, OnInit } from '@angular/core';
import {User, Group, UserSession} from '../user';
import {Link, SiteConfig} from '../links';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../page'
import {UserService} from '../user.service'
import {AppConfigService} from '../app-config.service'
import {Router} from '@angular/router'
import {MediaMatcher} from '@angular/cdk/layout';

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

  mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
  
	constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private userService: UserService, private configService: AppConfigService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

  ngOnInit(): void {
		this.userService.getSession().subscribe(response => {
			this.getUserInfo(response)
			this.userService.curSession = response
		})
		this.configService.getConfig().subscribe(response => {this.sideBar = response; this.title = response.Title})
  }

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
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
