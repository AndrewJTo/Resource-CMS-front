import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms'
import {Location} from '@angular/common'
import {Page, Permissions} from '../page'
import {PageService} from '../page.service'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {

	newPage = true
	currentPage: Page

	pageSettingsForm = this.fb.group({
		Title: ['', Validators.required],
		Text: ['', Validators.required]
	})

	doEdit(){
		var page:Page  = {
			page_title: this.pageSettingsForm.value.Title,
			page_text: this.pageSettingsForm.value.Text,
			permissions: {all_users_view: true}
		}

		if(this.newPage){
			//Creating a new page
			this.pageService.newPage(page).subscribe(response => {
				this._snackBar.open(response.msg, "close")
				if(response.success == true){
					this.router.navigate(['app/settings/site'])
				}
			})
		} else {
			//Updating existing page
			if(this.currentPage == null){
				this._snackBar.open("Error page does not exist!", "OK")
				return
			}
			this.pageService.editPage(this.currentPage.page_title, page).subscribe(response => {
				this._snackBar.open(response.msg, "close")
				if(response.success == true){
					this.router.navigate(['app/settings/site'])
				}

			})
		}
	}

	populatePage(pageTitle: string){
		if(pageTitle != null){
			this.pageService.getPage(pageTitle).subscribe(p => {
				this.currentPage = p
				this.newPage = false
				this.pageSettingsForm.patchValue({
					Title: p.page_title,
					Text: p.page_text
				})
			})
		} else {
			this.newPage = true
			this.pageSettingsForm.patchValue({
				Title: "",
				Text: ""
			})
		}
	}

	cancel(){
		this.location.back()
	}

  constructor(private pageService: PageService, private _snackBar: MatSnackBar, private location: Location, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
		this.route.params.subscribe(params => {this.populatePage(params['page_title'])})
  }

}
