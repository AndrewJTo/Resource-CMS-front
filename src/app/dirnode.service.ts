import { Injectable } from '@angular/core';
import { Fnode } from './node'

@Injectable({
  providedIn: 'root'
})
export class DirnodeService {

  constructor() { }

	getDirList (loc:string): Fnode[] {
		return [
			{title:"file 1", location:"/asd/test", type:"file", url:"/asd/test"},
			{title:"file 2", location:"/asd/test", type:"file", url:"/asd/test"},
			{title:"file 3", location:"/asd/test", type:"file", url:"/asd/test"},
			{title:"dir1", location:"/asd/test", type:"dir", url:"/asd/test"}
		]
	}
}
