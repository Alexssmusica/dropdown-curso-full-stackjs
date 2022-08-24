drop table if exists public.card;
drop table if exists public.column;
drop table if exists public.board;

create table public.board (
	id_board serial primary key,
	name text
);

create table public.column (
	id_column serial primary key,
	id_board integer references public.board (id_board),
	name text,
	has_estimative boolean
);

create table public.card (
	id_card serial primary key,
	id_column integer references public.column (id_column),
	title text,
	estimative integer,
	color text,
	index integer
);

insert into public.board (name) values ('Projeto 1');
insert into public.column (id_board, name, has_estimative) values (1, 'Coluna A', true);
insert into public.column (id_board, name, has_estimative) values (1, 'Coluna B', true);
insert into public.column (id_board, name, has_estimative) values (1, 'Coluna C', true);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 1', 'blue', 3);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 2', 'yellow', 2);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 3', 'red', 1);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 4', 'green', 2);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 5', 'orange', 5);
insert into public.card (id_column, title, color, estimative) values (1, 'Atividade 6', 'white', 6);
insert into public.board (name) values ('Projeto 2');
insert into public.column (id_board, name, has_estimative) values (2, 'Coluna A', true);
