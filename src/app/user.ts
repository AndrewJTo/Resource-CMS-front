export interface User {
	id: string;
	creation_date: number;
	first_name: string;
	last_name: string;
}

export interface Group {
	id: string
	group_name: string
	write_resources: boolean
	write_pages: boolean
	user_admin: boolean
	site_admin: boolean
	sudo: boolean
}

export interface LoginDetails {
	email_address: string;
	password: string;
}

export interface LoginResponse {
	group: Group
	user: User
	login: boolean
	msg: string
}

 export interface UserSession {
	 status: string
	 user: User
	 group: Group
	 user_group: string
 }

 export interface EditUser {
	 email_address: string
	 password: string
	 password_old: string
	 email_address_old: string
	 first_name: string
	 last_name: string
	 group_id: string
 }

 export interface UserDetails {
	 email: string
	 group: Group
	 user: User
 }
