export interface Link {
	location: string;
	text: string;
}

export interface SiteConfig {
	Title: string;
	Links: Link[];
}

export interface LinkLogon {
	id: string
	link: Link
	username: string
	password: string
}
