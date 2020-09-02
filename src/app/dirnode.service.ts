import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Fnode, FileObject, DirNode, NewObj } from './node'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import {OpResponse} from './comms'

@Injectable({
  providedIn: 'root'
})
export class DirnodeService {

  constructor(private http: HttpClient) { }

	upload(url: string, file: File){
		return this.http.put(url, file).pipe(catchError(this.handleS3Error("Upload error")))
	}

	delete(loc: string){
		return this.http.delete<OpResponse>("/api/files" + loc).pipe(catchError(this.handleError<OpResponse>("Deleting: " + loc)))
	}

	create(loc:string, details: NewObj){
		return this.http.put<OpResponse>("/api/files" + loc, details).pipe(catchError(this.handleError<OpResponse>("Creating " + details.Type)))
	}

	getDirList (loc:string) {
		return this.http.get<DirNode>("/api/files" + loc).pipe(catchError(this.handleError("Get list")))
	}

	private handleS3Error<T>(operation='op', result?:T){
		return (error: any): Observable<T> => {
			console.log(error)
			return of(result as T)
		}
	}

	private handleError<OpResponse>(operation = 'op', result?:OpResponse){
		return (error: any): Observable<OpResponse> => {
			return of(error.error)
		}
	}

}
