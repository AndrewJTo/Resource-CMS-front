import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms'
import { EventService } from '../event.service'
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'
import {Location} from '@angular/common'
import {Event} from '../event'

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

	eventForm = this.fb.group({
		Title: ['', Validators.required],
		Note: [''],
		Date: ['']
	})

	event: Event
	isNew = false

	cancel(){
		this.location.back()
	}

	doneEdit(){
		this.formToObject()
		console.log(this.event)
		if(this.isNew){
			this.eventService.newEvent(this.event).subscribe(resp => {
				this._snackBar.open(resp.msg, "OK")
				if(resp.success){
					this.location.back()
				}
			})
		} else {
			this.eventService.editEvent(this.event.id, this.event).subscribe(resp => {
				this._snackBar.open(resp.msg, "OK")
				if(resp.success){
					this.location.back()
				}
			})
		}
	}

	formToObject(){
		console.log(this.eventForm.value.Date)
		this.event = {
			id: this.event.id, 
			title: <string>this.eventForm.value.Title, 
			note: <string>this.eventForm.value.Note, 
			date: this.eventForm.value.Date
		}
	}

	applyToForm(){
		this.eventForm.patchValue({
			Title: this.event.title,
			Note: this.event.note,
			Date: this.event.date
		})
	}

	populate(eID: string){
		console.log("ID " + eID)
		if(eID != null){
			this.eventService.getEvent(eID).subscribe(resp => {
				try {
					this.event = <Event>resp
					this.applyToForm()
				} catch (error) {
					console.log(error)
					console.log(resp)
					this.isNew = true
					this.event = {id:"", title:"", note:"", date: new Date()}
				}
			})
		} else {
			this.isNew = true
			this.event = {id:"", title:"", note:"", date: new Date()}
		}
	}

  constructor(private fb: FormBuilder, private location: Location, private _snackBar: MatSnackBar, private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
		this.route.params.subscribe(params => {this.populate(params['eid'])})
  }

}
