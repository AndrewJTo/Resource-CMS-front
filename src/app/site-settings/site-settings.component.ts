import { Component, OnInit } from '@angular/core';
import {Page} from '../page'
import {PageService} from '../page.service'
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css']
})
export class SiteSettingsComponent implements OnInit {

	pages: Page[]

	deletePrompt(p: Page){
		const dialogRef = this.dialog.open(SiteSettingsDeleteDialog)
		dialogRef.afterClosed().subscribe(result => {
			if(result == true){
				this.pageService.deletePage(p.page_title).subscribe(response => {
					this._snackBar.open("Page Deleted!", "OK")
					this.fetchPages()
				})
			}
		})
	}

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private pageService: PageService) { }

	fetchPages(){
		this.pageService.getPages().subscribe(response => {this.pages = response, console.log(response)})
	}

  ngOnInit(): void {
		this.fetchPages()
  }

}

@Component ({
	selector: 'site-settings-delete-dialog',
	templateUrl: 'site-settings-delete-dialog.html',
})
export class SiteSettingsDeleteDialog {}
