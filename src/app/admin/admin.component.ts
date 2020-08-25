import { Component, OnInit } from '@angular/core';
import {User} from '../user'
import {UserService} from '../user.service'
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	deleteDialog(u: User){
		const dialogRef = this.dialog.open(AdminDeleteDialog)
		dialogRef.afterClosed().subscribe(result => {
			if(result == true){
				this._snackBar.open("Currently unavaliable", "OK")
			}
		})
	}

	users: User[]

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
		this.userService.getAllUsers().subscribe(response => {this.users = response})
  }

}

@Component ({
	selector: 'admin-delete-dialog',
	templateUrl: 'admin-delete-dialog.html',
})
export class AdminDeleteDialog {}
