import { Component, OnInit } from '@angular/core';
import {Link, SiteConfig} from '../links';
import {AppConfigService} from '../app-config.service'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent implements OnInit {

	links: Link[]
	title: string

	newLinkForm = this.fb.group({
		Title: ['', Validators.required],
		Url: ['', Validators.required]
	})

	siteNameGroup = this.fb.group({
		SiteTitle: ['', Validators.required]
	})

	showNewLinkDialog = false
	linksChanged = false
	titleChanged = false
	
	changeName(){
		console.log("Saving Title changes: " + this.siteNameGroup.value['SiteTitle'])
		this.configService.saveChanges({Title: this.siteNameGroup.value['SiteTitle'], Links: this.links}).subscribe(resp => {
			console.log(resp)
			window.location.reload()
		})
	}

	cancelNameChange(){
		this.siteNameGroup.patchValue({SiteTitle: this.title})
	}

	saveLinkChanges(){
		console.log("Saving Link changes")
		this.configService.saveChanges({Title: this.title, Links: this.links}).subscribe(resp => {
			this.linksChanged = false
			this.cancelNewLink()
			window.location.reload()
		})
	}

	removeLink(l: Link){
		console.log("Remove")
		var index: number = this.links.indexOf(l)
		if(index !== -1){
			this.links.splice(index, 1)
		}
	}

	submitNewLink(){

		var link:Link = {text: this.newLinkForm.value['Title'], location: this.newLinkForm.value['Url']}
		if(this.links == null){
			this.links = [link]
		} else {
			this.links.push(link)
		}
		this.showNewLinkDialog = false
		this.linksChanged = true
	}

	cancelNewLink(){
		this.newLinkForm.reset()
		this.showNewLinkDialog = false
	}

	openNewLinkForm(){
		this.newLinkForm.reset()
		this.showNewLinkDialog = true
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.links, event.previousIndex, event.currentIndex)
		this.linksChanged = true
	}

  constructor(private fb: FormBuilder, private configService: AppConfigService) { }

  ngOnInit(): void {
		this.configService.getConfig().subscribe(response => {
			this.links = response.Links
			this.title = response.Title
			this.siteNameGroup.patchValue({SiteTitle: this.title})
		})
  }

}
