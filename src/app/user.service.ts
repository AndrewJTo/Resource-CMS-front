import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { EditUser, UserSession, User, UserDetails, Group } from './user'
import {OpResponse} from './comms'

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public curSession: UserSession

  constructor(private http: HttpClient) { }

	getGroupList(){
		return this.http.get<Group[]>("api/groups").pipe(catchError(this.handleError<Group[]>("Get group list")))
	}

	getSession(){
		return this.http.get<UserSession>("/api/getsession").pipe(catchError(this.handleError<UserSession>("Get Session")))
	}

	logout(){
		return this.http.get<UserSession>("/api/logout").pipe(catchError(this.handleError<UserSession>("Logout")))
	}

	getUserById(userId: string) {
		return this.http.get<UserDetails>("/api/user/" + userId).pipe(catchError(this.handleError<UserDetails>("Getting " + userId)))
	}

	getAllUsers(){
		return this.http.get<User[]>("/api/users").pipe(catchError(this.handleError<User[]>("List Users")))
	}

	sendUserUpdate(id: string, edit: EditUser){
		return this.http.post<OpResponse>("/api/user/" + id, edit).pipe(catchError(this.handleChangeError<OpResponse>("Updating")))
	}

	sendNewUser(edit: EditUser){
		return this.http.put<OpResponse>("/api/user/new", edit).pipe(catchError(this.handleChangeError<OpResponse>("New")))
	}

	private handleChangeError<OpResponse>(operation = 'op', result?:OpResponse){
		return (error: any): Observable<OpResponse> => {
			return of(error.error)
		}
	}

	private handleError<T>(operation = 'operation', result?:T){
		return (error: any): Observable<T> => {
			console.error(error)

			return of(result as T)
		}
	}
}
