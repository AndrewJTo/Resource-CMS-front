import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { SiteConfig } from './links'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private http: HttpClient) {}

	saveChanges(config: SiteConfig){
		return this.http.put("/api/site/sidebar", config)
	}

	getConfig(): Observable<SiteConfig>{
		return this.http.get<SiteConfig>("/api/site/sidebar").pipe(catchError(this.handleError<SiteConfig>("Get Settings")))
	}

	private handleError<T>(operation = 'operation', result?:T){
		return (error: any): Observable<T> => {
			console.error(error)

			return of(result as T)
		}
	}

}
