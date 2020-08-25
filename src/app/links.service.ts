import { Injectable } from '@angular/core';
import {Link, LinkLogon } from './links'
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {OpResponse} from './comms'

@Injectable({
  providedIn: 'root'
})
export class LinksService {

	getLink (id: string): Observable<LinkLogon> {
		return this.http.get<LinkLogon>("/api/links/" + id).pipe(catchError(this.handleError<LinkLogon>("Getting link")))
	}

	getLinkss (): Observable<LinkLogon[]> {
		return this.http.get<LinkLogon[]>("/api/links")
	}

	editLink (id: string, newLink: LinkLogon) {
		return this.http.post<OpResponse>("/api/links/" + id, newLink).pipe(catchError(this.handleError<OpResponse>("Changing link")))
	}

	newLink (newLink: LinkLogon) {
		return this.http.put<OpResponse>("/api/links", newLink).pipe(catchError(this.handleError<OpResponse>("New Link")))
	}

	deleteLink (id: string) {
		return this.http.delete<OpResponse>("/api/links/" + id).pipe(catchError(this.handleError<OpResponse>("Deleting Link")))
	}


	private handleError<OpResponse>(operation = 'op', result?:OpResponse){
		return (error: any): Observable<OpResponse> => {
			return of(error.error)
		}
	}

  constructor(private http: HttpClient) {}
}
