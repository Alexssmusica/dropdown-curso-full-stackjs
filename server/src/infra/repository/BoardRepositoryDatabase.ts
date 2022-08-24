import Board from '../../domain/entity/Board';
import BoardRepository from '../../domain/repository/BoardRepository';
import { trataMensagemErrorTry } from '../../util/AppUtil';
import Connection from '../database/Connection';

export default class BoardRepositoryDatabase implements BoardRepository {
	constructor(readonly connection: Connection) {}

	async findAll(): Promise<Board[]> {
		try {
			const boardsData = await this.connection.query('select id_board, name from public.board', []);
			const boards: Board[] = [];
			for (const boardData of boardsData) {
				const board = new Board(boardData.id_board, boardData.name);
				boards.push(board);
			}
			return boards;
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw new Error(trataMensagemErrorTry(error));
		}
	}

	async get(idBoard: number): Promise<Board> {
		try {
			const [boardData] = await this.connection.query('select * from public.board where id_board = $1', [
				idBoard
			]);
			if (!boardData) throw new Error('Board not found');
			const board = new Board(boardData.id_board, boardData.name);
			return board;
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async save(board: Board): Promise<number> {
		try {
			const [boardData] = await this.connection.query('insert into public.board (name) values ($1) returning *', [
				board.name
			]);
			return boardData.id_board;
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async update(board: Board): Promise<void> {
		try {
			await this.connection.query('update public.board set name = $1 where id_board = $2', [
				board.name,
				board.idBoard
			]);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async delete(idBoard: number): Promise<void> {
		try {
			await this.connection.query('delete from public.board where id_board = $1', [idBoard]);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}
}
