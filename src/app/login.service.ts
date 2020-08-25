import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { LoginDetails, LoginResponse } from './user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private loginUrl = '/api/login'

	httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

	tryLogin(details: LoginDetails): Observable <LoginResponse> {
		return this.http.post<LoginResponse>(this.loginUrl, details, this.httpOptions)
		.pipe(catchError(this.handleError<LoginResponse>('login')))
	}
/**
 * Handle Http operation that failed.
  * Let the app continue.
		 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	  */
	private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	   // TODO: send the error to remote logging infrastructure
	   console.error(error); // log to console instead
	   // Let the app keep running by returning an empty result.
	   return of(result as T);
	 };
	}
}
