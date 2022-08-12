import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnection implements Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:jcuser@localhost:5432/dropdown");
	}

	query(statement: string, params: any): Promise<any> {
		console.log(statement, params);
		return this.connection.query(statement, params);
	}

	close(): Promise<void> {
		return this.connection.$pool.end();
	}
}