export interface Page {
	page_title: string;
	page_text: string;
	permissions: Perms
}
export interface Perms {
	all_users_view: boolean
}
