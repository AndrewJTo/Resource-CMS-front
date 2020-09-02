export interface Fnode {
	id: string
	Title: string
	Location: string
	Type: string
	content_id: string
}

export interface FileObject {
	file_name: string
	last_modified: Date
}

export interface DirNode {
	node: Fnode
	children: Fnode[]
}

export interface NewObj {
	Type: string
	Name: string
}
