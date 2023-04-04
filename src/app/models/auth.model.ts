export interface UserCredentials {
	email: string;
	password: string;
}

export interface UserRegistration extends UserCredentials {
	name: string;
	jobTitle: string;
	role: Role;
	organisations: string[];
}

export enum Role {
	Admin = 'admin',
	Sales = 'sales',
}

export interface IdentityModel {
	email: string;
	oldPassword: string;
	newPassword: string;
}

export interface TokenString {
	token: string;
}

export interface ResourceId {
	id: string;
}
