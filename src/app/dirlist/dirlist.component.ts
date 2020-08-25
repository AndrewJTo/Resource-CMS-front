import { Component, OnInit, Input } from '@angular/core';
import {Fnode} from '../node';
import {ActivatedRoute} from '@angular/router';
import {DirnodeService} from '../dirnode.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dirlist',
  templateUrl: './dirlist.component.html',
  styleUrls: ['./dirlist.component.scss']
})
export class DirlistComponent implements OnInit {
	nodes:Fnode[];

  constructor(private route: ActivatedRoute, private router: Router, private nodeService: DirnodeService) { }

	getDir(loc: string): void {
		loc = loc.substring(9)
		console.log("loading dir listing " + loc)
		this.nodes = this.nodeService.getDirList(loc)
	}

  ngOnInit(): void {
		this.route.url.subscribe(params => this.getDir(this.router.url));
  }

}
