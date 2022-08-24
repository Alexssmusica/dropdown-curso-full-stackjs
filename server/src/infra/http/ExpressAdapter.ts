import Http from './Http';
import express, { NextFunction, Request, Response } from 'express';
import { trataMensagemErrorTry } from '../../util/AppUtil';

export default class ExpressAdapter implements Http {
	app: any;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(function (req: any, res: any, next: any) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			next();
		});
		this.app.use(function (req: Request, res: Response, next: NextFunction) {
			if (req.method === 'OPTIONS') return next();
			if (req.url === '/login') return next();
			const authorization = req.headers['authorization'];
			if (authorization) {
				const token = authorization.replace('Bearer ', '');
				if (token === '123456') {
					return next();
				}
			}
			return res.status(401).json({ message: 'Não autorizado', status: 401 }).end();
		});
	}

	route(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body);
				res.json(output);
			} catch (error) {
				res.status(500)
					.json({ message: trataMensagemErrorTry(error) })
					.end();
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => console.log(`Servidor rest iniciado na porta ${port}.`));
	}
}
