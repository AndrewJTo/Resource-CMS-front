import { Injectable } from '@angular/core';
import { Page } from './page'
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {OpResponse} from './comms'

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient ) { }

	getPage (title: string): Observable<Page> {
		return this.http.get<Page>("/api/pages/" + title).pipe(catchError(this.handlePageError<Page>("Getting page")))
	}

	getPages (): Observable<Page[]> {
		return this.http.get<Page[]>("/api/pages")
	}

	editPage (currentTitle: string, newPage: Page) {
		return this.http.post<OpResponse>("/api/pages/" + currentTitle, newPage).pipe(catchError(this.handleChangeError<OpResponse>("Changing page")))
	}

	newPage (newPage: Page) {
		return this.http.put<OpResponse>("/api/pages", newPage).pipe(catchError(this.handleChangeError<OpResponse>("New Page")))
	}

	deletePage (title: string) {
		return this.http.delete<OpResponse>("/api/pages/" + title).pipe(catchError(this.handleChangeError<OpResponse>("Deleting page")))
	}

	private handleChangeError<OpResponse>(operation = 'op', result?:OpResponse){
		return (error: any): Observable<OpResponse> => {
			return of(error.error)
		}
	}

	private handlePageError<Page>(operation = 'op', result?:Page){
		return (error: any): Observable<Page> => {
			console.error(error)
			
		return of(result)
		}
	}
}
