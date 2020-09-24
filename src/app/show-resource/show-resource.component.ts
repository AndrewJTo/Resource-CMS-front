import { Component, OnInit, Input } from '@angular/core';
import { DirnodeService } from '../dirnode.service'
import { SafeHtmlPipe } from '../safe-html.pipe'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent implements OnInit {

	@Input() url: string
	@Input() ext: string
	text: string
	docViewer: boolean
	
  constructor(public sanitizer: DomSanitizer, private dirService: DirnodeService) { }

	getPrevURL(){
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.text)
	}

  ngOnInit(): void {
		//Detect file type
		this.docViewer = false
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
			this.text = "<iframe src='" + this.url + "' onload='resizeIframe(this)' style='width:100%; height:85vh'></iframe>"
		} else if(this.ext == "doc" ||this.ext == "docx" ||this.ext == "xls" || this.ext == "xlsx"||this.ext == "ppt" || this.ext == "pptx" ){
			console.log("Show previewer")
			this.text = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(this.url)
			console.log(this.text)
			this.docViewer = true
		}
  }

}
