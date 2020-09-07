import { Component, OnInit } from '@angular/core';
import {Event} from '../event'
import {EventService} from '../event.service'
import {UserService} from '../user.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

	events: Event[]
	allowEdit = false

  constructor(private eventService: EventService, private userService: UserService) { }

	sortEventTime(a:Event, b:Event){
		if(a.date < b.date){
			return -1
		}
		if(a.date > b.date){
			return 1
		}
		return 0		
	}

	delete(e: Event){
		this.eventService.deleteEvent(e.id).subscribe(resp => {
			console.log(resp)
			this.refresh()
		})
	}

	refresh(){
		this.eventService.getEvents().subscribe(resp => {
			this.events = resp
			console.log(resp)
			if(this.events != null){
				this.events.sort(this.sortEventTime)
				var now = new Date()
				console.log(now)
				console.log("############")
				for(let e of this.events){
					var d = new Date(e.date)
					console.log(d)
					if(d < now){
						console.log("REMOVED")
						this.events.shift()
					} else {
						console.log("DONE")
						break
					}
				}
			}
		})
	}

  ngOnInit(): void {
		this.refresh()
		if(this.userService.curSession == null){
			this.userService.getSession().subscribe(res => {
				if(res.group.site_admin){
					this.allowEdit = true
				}
			})
		} else {
			if(this.userService.curSession.group.site_admin){
				this.allowEdit = true
			}
		}
  }

}
