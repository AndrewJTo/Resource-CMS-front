import { Component, OnInit } from '@angular/core';
import { catchError, map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {LinksService} from '../links.service'
import {Link, LinkLogon } from '../links'
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms'
import {UserService} from '../user.service'

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

	links: LinkLogon[]
	editing: LinkLogon
	newLink = true
	openEditBox = false
	allowEditing = false

	editSettingsForm = this.fb.group({
		Text: ['', Validators.required],
		Location: ['', Validators.required],
		Username: [''],
		Password: ['']
	})

	hideEditorPassword = false

	deleteLink(l: LinkLogon){
		this.linksService.deleteLink(l.id).subscribe(response => {
			this._snackbar.open(response.msg, "OK")
			this.fetchLinks()
		})
	}

	submitEdit(){
		if(this.newLink){
			this.editing = {
				id: "",
				link:{
					location: this.editSettingsForm.value.Location,
					text: this.editSettingsForm.value.Text
				},
				username: this.editSettingsForm.value.Username,
				password: this.editSettingsForm.value.Password
			}
			this.linksService.newLink(this.editing).subscribe(response => {
				this._snackbar.open(response.msg, "OK")
				if(response.success == true){
					this.cancelEdit()
					this.fetchLinks()
				}
			})
		} else {
			this.editing = {
				id: this.editing.id,
				link:{
					location: this.editSettingsForm.value.Location,
					text: this.editSettingsForm.value.Text
				},
				username: this.editSettingsForm.value.Username,
				password: this.editSettingsForm.value.Password
			}
			this.linksService.editLink(this.editing.id, this.editing).subscribe(response => {
				this._snackbar.open(response.msg, "OK")
				if(response.success == true){
					this.cancelEdit()
					this.fetchLinks()
				}
			})
		}
		console.log(this.editing)
	}

	cancelEdit(){
		this.newLink = false
		this.editing = {id:"", link:{location:"", text:""}, username:"", password:""}
		this.openEditBox = false
	}

	createNew(){
		this.newLink = true
		this.editing = {id:"", link:{location:"", text:""}, username:"", password:""}
		this.openEditBox = true
		this.editSettingsForm.patchValue({Text: "", Location: "", Username: "", Password: ""})
	}
	
	editLink(l: LinkLogon, link: Link){
		this.newLink = false
		this.editing = l
		this.editing.link = link //No idea why have to do this
		this.openEditBox = true
		this.editSettingsForm.patchValue({
			Text: this.editing.link.text,
			Location: this.editing.link.location,
			Username: this.editing.username,
			Password: this.editing.password
		})
	}

	fetchLinks(){
		this.linksService.getLinkss().subscribe(response =>{
			this.links = response
			console.log(this.links)
		})
	}

  constructor(private userService: UserService, private fb: FormBuilder, private _snackbar: MatSnackBar, private linksService: LinksService) { }

  ngOnInit(): void {
		this.fetchLinks()
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
