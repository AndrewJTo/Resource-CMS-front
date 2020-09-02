import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DirnodeService } from '../dirnode.service'
import { NewObj } from '../node'
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
	@Input("path")path: String
	@Output("closed")closed = new EventEmitter<boolean>()

	filename = ""
	selectedFile: File

	doUpload(){
		//Get presigned URL
		this.dirService.create(this.path + "/" + this.filename, {Type:"file",Name:this.filename}).subscribe(resp => {
			if(resp.success){
				//We can do the upload now
				this.dirService.upload(resp.msg, this.selectedFile).subscribe(resp => {
					if(resp == null){
						this._snackBar.open("File Uploaded")
						this.closed.emit(true)
					} else {
						console.log(resp)
						if((<HttpErrorResponse>resp).error != null){
							this._snackBar.open("ERROR: " + (<HttpErrorResponse>resp).message, "OK")
						}
						this.closed.emit(false)
					}
				})

			} else {
				this._snackBar.open("Upload Failed: " + resp.msg, "OK")
			}
		})
	}

	fileChangeEvent(event){
		console.log("File changed")
		this.selectedFile = event.target.files[0]
		this.filename = this.selectedFile.name.replace(/[|&;$%@"<>()+,]/g, '')	//Remove invalid
		this.filename = this.selectedFile.name.replace(/\s/g, "-")
		console.log("Uploading: " + this.filename)
	}

	openFileInput(){
		document.getElementById("input-file").click()
	}
	

  constructor(private _snackBar: MatSnackBar, private dirService: DirnodeService) { }

  ngOnInit(): void {
  }

}
