import { Stock } from "./stock";

export class User {
	email: string;
    password: string;
    name?: string;
    stocks?: Stock[];
}