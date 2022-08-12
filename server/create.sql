drop table if exists dropdown.card;
drop table if exists dropdown.column;
drop table if exists dropdown.board;

create table dropdown.board (
	id_board serial primary key,
	name text
);

create table dropdown.column (
	id_column serial primary key,
	id_board integer references dropdown.board (id_board),
	name text,
	has_estimative boolean,
	index integer
);

create table dropdown.card (
	id_card serial primary key,
	id_column integer references dropdown.column (id_column),
	title text,
	estimative integer,
	index integer
);

insert into dropdown.board (name) values ('Projeto 1');
insert into dropdown.column (id_board, name, has_estimative) values (1, 'Coluna A', true);
insert into dropdown.column (id_board, name, has_estimative) values (1, 'Coluna B', true);
insert into dropdown.column (id_board, name, has_estimative) values (1, 'Coluna C', true);
insert into dropdown.card (id_column, title, estimative) values (1, 'Atividade 1', 3);
insert into dropdown.card (id_column, title, estimative) values (1, 'Atividade 2', 2);
insert into dropdown.card (id_column, title, estimative) values (1, 'Atividade 3', 1);