import { Component, OnInit, Input } from '@angular/core';
import { DirnodeService } from '../dirnode.service'
import { SafeHtmlPipe } from '../safe-html.pipe'

@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent implements OnInit {

	@Input() url: string
	@Input() ext: string
	text: string
	
  constructor(private dirService: DirnodeService) { }

  ngOnInit(): void {
		//Detect file type
		console.log(this.url)
		console.log(this.ext)
		if(this.ext == "txt"){
			//We can just print this
			this.dirService.getS3Text(this.url).subscribe(resp => {
				console.log(resp)
				this.text = <string>resp
				if(this.text.startsWith("link:")){
					var link = this.text.split("link:")[1]
					this.text = "<a href='" + link + "'>" + this.text + "</a>"
				}
			})
		} else if(this.ext == "html" || this.ext == "htm" || this.ext == "pdf"){
			//We can show these
			console.log("Show frame")
			this.text = "<iframe src='" + this.url + "'></iframe>"
		}
  }

}
