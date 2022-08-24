import Card from '../../domain/entity/Card';
import CardRepository from '../../domain/repository/CardRepository';
import { trataMensagemErrorTry } from '../../util/AppUtil';
import Connection from '../database/Connection';

export default class CardRepositoryDatabase implements CardRepository {
	constructor(readonly connection: Connection) {}

	async findAllByIdColumn(idColumn: number): Promise<Card[]> {
		try {
			const cardsData = await this.connection.query(
				'select id_column, id_card, title, estimative, color from public.card where id_column = $1 order by index',
				[idColumn]
			);
			const cards: Card[] = [];
			for (const cardData of cardsData) {
				cards.push(
					new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative, cardData.color)
				);
			}
			return cards;
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async save(card: Card): Promise<number> {
		try {
			const [cardData] = await this.connection.query(
				'insert into public.card (id_column, title, estimative) values ($1, $2, $3) returning *',
				[card.idColumn, card.title, card.estimative]
			);
			return cardData.id_card;
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async update(card: Card): Promise<void> {
		try {
			await this.connection.query('update public.card set title = $1, estimative = $2 where id_card = $3', [
				card.title,
				card.estimative,
				card.idCard
			]);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async delete(idCard: number): Promise<void> {
		try {
			await this.connection.query('delete from public.card where id_card = $1', [idCard]);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async updateIdColumnAndIndex(idCard: number, idColumn: number, index: number): Promise<void> {
		try {
			await this.connection.query('update public.card set id_column = $1, index = $2 where id_card = $3', [
				idColumn,
				index,
				idCard
			]);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	list(title: string): Promise<Card[]> {
		try {
			if (!title) {
				return this.connection.query('select * from public.card', []);
			} else {
				return this.connection.query('select * from public.card where title like $1', [`%${title}%`]);
			}
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}

	async get(idCard: number): Promise<Card> {
		try {
			const [cardData] = await this.connection.query('select * from public.card where id_card = $1', [idCard]);
			if (!cardData) throw new Error('Card not found');
			return new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative, cardData.color);
		} catch (error) {
			console.error(trataMensagemErrorTry(error));
			throw Error(trataMensagemErrorTry(error));
		}
	}
}
