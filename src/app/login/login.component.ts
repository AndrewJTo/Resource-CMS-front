import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import {LoginService} from  '../login.service'
import {LoginDetails, LoginResponse} from '../user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email = new FormControl('', [Validators.required, Validators.email]);
	hide=true;
	loginError: boolean = false;
	response: LoginResponse

	getErrorMessage() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	doLogin(email: string, password: string){
		var details:LoginDetails = {email_address:email, password:password}
		this.loginService.tryLogin(details).subscribe(response => {this.loginResponseRecieved(response)})
		return false
	}

	loginResponseRecieved(response: LoginResponse){
		console.log("Login response recieved")
		if(response == null){
			console.log("Recieved empty response")
			this.loginError = true;
		} else {
			if (response.login == false){
				console.log("Login failed: " + response.msg)
			} else {
				this.loginError = false
				console.log("Login success!")
				this.router.navigate(['app/page/home'])
			}
		}
	}

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

}
