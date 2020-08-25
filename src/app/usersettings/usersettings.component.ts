import { Component, OnInit } from '@angular/core';
import {EditUser, User, UserDetails, Group } from '../user'
import {Router, ActivatedRoute} from '@angular/router'
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms'
import {Location} from '@angular/common'
import {UserService} from '../user.service'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UserSettingsComponent implements OnInit {

	editing: EditUser = {email_address:"", password:"", password_old:"", email_address_old:"", first_name:"", last_name:"", group_id:"" }
	newUser: boolean
	requirePass: boolean
	userDetails: UserDetails
	allowGroupChange: boolean

	avaliableGroups: Group[]
	currentGroup: Group

	currentUserId: string

	userSettingsForm = this.fb.group({
			Email: ['', Validators.email],
			Password: [''],
			FirstName: [''],
			LastName: [''],
			GroupName: [''],
			formGroupSelect: [''],
			Password_old: ['']
		})

	hideNewPassword = true
	hideOldPassword = true

  constructor(private router: Router, private _snackBar: MatSnackBar, private userService: UserService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {}

	submitForm(){
		this.editing = {email_address:"", password:"", password_old:"", email_address_old:"", first_name:"", last_name:"", group_id:"" }
		if(this.newUser){
				this.editing.email_address = this.userSettingsForm.value['Email']
				this.editing.first_name = this.userSettingsForm.value['FirstName']
				this.editing.last_name = this.userSettingsForm.value['LastName']
				this.editing.group_id = this.userSettingsForm.value['formGroupSelect'].id
		} else {
			//Only send values if they have changed
			if(this.userDetails.email != this.userSettingsForm.value['Email']){
				this.editing.email_address = this.userSettingsForm.value['Email']
			}
			if(this.userDetails.user.first_name != this.userSettingsForm.value['FirstName']){
				this.editing.first_name = this.userSettingsForm.value['FirstName']
			}
			if(this.userDetails.user.last_name != this.userSettingsForm.value['LastName']){
				this.editing.last_name = this.userSettingsForm.value['LastName']
			}
			if(this.userDetails.group.id != this.userSettingsForm.value['formGroupSelect'].id){
				this.editing.group_id = this.userSettingsForm.value['formGroupSelect'].id
			}
			this.editing.email_address_old = this.userDetails.email
		}
		this.editing.password = this.userSettingsForm.value['Password']
		this.editing.password_old = this.userSettingsForm.value['Password_old']
		console.log(this.editing)
		if(this.newUser){
			this.userService.sendNewUser(this.editing).subscribe(response => {
				this._snackBar.open(response.msg, "OK")
				if(response.success == true){
					this.router.navigate(['/app/settings/admin'])
				}
			})
		} else {
			this.userService.sendUserUpdate(this.currentUserId, this.editing).subscribe(response => {
				this._snackBar.open(response.msg, "OK")
			})
		}
	}

	getErrorMessage(element: FormControl) {
		if (element.hasError('email')){
			return 'Not a valid email'
		}
		return ''
	}

	cancel(){
		this.location.back()
	}

	compareGroups(a,b){
		if (a.id == b.id) {
			console.log("same")
		} else {
			console.log(" not same")
		}
		return a.id == b.id
	}

	editExitingUser(details: UserDetails) {
		this.userDetails = details
		console.log("Current group: " + this.userDetails.group.group_name)
		this.currentGroup = this.userDetails.group
		this.userSettingsForm.patchValue({
			Email: details.email,
			FirstName: details.user.first_name,
			LastName: details.user.last_name,
			GroupName: details.group.group_name,
			formGroupSelect: details.group
		})
		this.userSettingsForm.controls['GroupName'].disable()

	}

	populatePage(userId: string){
		this.currentUserId = userId
		this.newUser = false
		if(userId != null){
			this.newUser = false
			if(userId == "me"){
				//Editing self
				this.allowGroupChange = false 		//TODO: Let admins demote themselves?
				this.newUser = false
				this.requirePass = true
				this.userService.getUserById("me").subscribe(details => { this.editExitingUser(details)})
			} else if (userId == "new"){
				//Making a new user
				this.allowGroupChange = true
				this.newUser = true
				this.editing = {
					email_address_old: "",
					email_address: "",
					password: "",
					password_old: "",
					first_name: "",
					last_name: "",
					group_id: ""
				}
			} else {
				//Editing other user get details from ID
				this.requirePass = false
				this.allowGroupChange = true
				this.userService.getUserById(userId).subscribe(details => { this.editExitingUser(details)})
			}
		}
	}

  ngOnInit(): void {
		this.route.params.subscribe(params => this.populatePage(params['user_id']))
		this.userService.getGroupList().subscribe(groups => {this.avaliableGroups = groups})
  }

}
