import { Injectable } from '@angular/core';
import { Event } from './event'
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {OpResponse} from './comms'

@Injectable({
  providedIn: 'root'
})
export class EventService {
	getEvent (eID: string) {
		return this.http.get<Event>("/api/events/" + eID).pipe(catchError(this.handleError<OpResponse>("Getting event")))
	}

	getEvents (): Observable<Event[]> {
		return this.http.get<Event[]>("/api/events")
	}

	editEvent (eID: string, newEvent: Event): Observable<OpResponse> {
		return this.http.post<OpResponse>("/api/events/" + eID, newEvent).pipe(catchError(this.handleError<OpResponse>("Changing event")))
	}

	newEvent (newEvent: Event) {
		return this.http.put<OpResponse>("/api/events", newEvent).pipe(catchError(this.handleError<OpResponse>("New Event")))
	}

	deleteEvent (eID: string): Observable<OpResponse> {
		return this.http.delete<OpResponse>("/api/events/" + eID).pipe(catchError(this.handleError<OpResponse>("Deleting events")))
	}


	private handleError<OpResponse>(operation = 'op', result?:OpResponse){
		return (error: any): Observable<OpResponse> => {
			return of(error.error)
		}
	}

  constructor(private http: HttpClient) { }
}
