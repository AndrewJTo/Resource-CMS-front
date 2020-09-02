import { Component, OnInit, Input, Inject } from '@angular/core';
import {Fnode, DirNode, FileObject, NewObj} from '../node';
import {ActivatedRoute} from '@angular/router';
import {DirnodeService} from '../dirnode.service'
import { Router } from '@angular/router';
import { OpResponse } from '../comms'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component'
import {UserService} from '../user.service'

@Component({
  selector: 'app-dirlist',
  templateUrl: './dirlist.component.html',
  styleUrls: ['./dirlist.component.scss']
})
export class DirlistComponent implements OnInit {
	nodes:DirNode = {node: {id: "", Title: "", Location: "", Type: "", content_id: ""}, children: []}
	dirs: Fnode[] = []
	files: Fnode[] = []
	showUpload:Boolean
	allowEdits = false

  constructor(private userService: UserService, private _snackBar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private nodeService: DirnodeService) { }

	closeUploader(reload: boolean){
		console.log("closed uploader" + reload)
		this.showUpload = false
		if(reload){
			this.getDir(this.router.url)
			console.log("Reloaded")
		}
	}

	delete(node: Fnode){
		console.log("delete node")
		this.nodeService.delete(node.Location + node.Title).subscribe(resp => {
			this._snackBar.open(resp.msg, "OK")
			this.getDir(this.router.url)
		})
	}

	showUploader(){
		this.showUpload = true
	}

	newDirDialog(): void {
		const dialogRef = this.dialog.open(DialogNewDir, {
			data: {currLoc: this.nodes.node.Location + this.nodes.node.Title, newDirName: ""},
		})

		dialogRef.afterClosed().subscribe(result => {
			if(result != null){
				if(result != ""){
					result = result.replace(/ /g,"_")
					var newDir = this.nodes.node.Location + this.nodes.node.Title + "/" + result + "/"
					console.log("Creaing new dir: '" + newDir + "'")
					
					this.nodeService.create(this.nodes.node.Location + this.nodes.node.Title + "/"  + result, {Type: "dir", Name: result}).subscribe(resp =>{
						if(resp.success){
							this._snackBar.open("Created new folder", "OK")
							this.router.navigateByUrl("/app/dir" + resp.msg)
						} else {
							this._snackBar.open(resp.msg, "OK")
						}
					})
					
				}
			}
		})
	}

	getDir(loc: string): void {
		this.dirs = []
		this.files = []
		loc = loc.substring(8)
		if (loc == ""){
			loc = "/"
		}
		console.log("loading dir listing " + loc)
		this.nodeService.getDirList(loc).subscribe(resp => {
			if((<OpResponse>resp).success != null){
				var r = <OpResponse>resp
				console.log(r.msg)
				if(r.success){
					window.location.replace(r.msg)
				}
			} else {
				this.nodes = <DirNode>resp
				console.log(this.nodes)
				for(let c of this.nodes.children) {
					if(c.Type == "dir"){
						this.dirs.push(c)
					} else {
						this.files.push(c)
					}
				}
			}
		})
	}

  ngOnInit(): void {
		if(this.userService.curSession == null){
			this.userService.getSession().subscribe(resp => {
				this.userService.curSession = resp
				if(resp.group.write_resources){
					this.allowEdits = true
				}
			})
		} else {
			if(this.userService.curSession.group.write_resources){
				this.allowEdits = true
			}
		}
		this.route.url.subscribe(params => this.getDir(this.router.url));
  }

}

export interface NewDirData {
	newDirName: string
	currLoc: string
}

@Component({
	selector: 'dialog-new-dir',
	templateUrl: 'dialog-new-dir.html',
})
export class DialogNewDir {
	constructor(public dialogRef: MatDialogRef<DialogNewDir>, @Inject(MAT_DIALOG_DATA) public data: NewDirData){}

	onNoClick(): void {
		this.dialogRef.close()
	}
}
