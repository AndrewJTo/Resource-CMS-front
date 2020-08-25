export interface Page {
	page_title: string;
	page_text: string;
	permissions: Permissions
}
export interface Permissions {
	all_users_view: boolean
}
