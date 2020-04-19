CREATE TABLE admin(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	contact bigint,
	password character varying(50),
	email character varying(50)
);

CREATE TABLE users(
	id UUID PRIMARY KEY,
	name character varying(30),
	email character varying(50),
	password character varying(50),
	contact bigint
);

CREATE TABLE victim(
	id SERIAL PRIMARY KEY,
	sex character varying(12),
	age int,
	pwdstat character varying(5),
	activity character varying(100),
	date date,
	time time,
	location character varying(100),
	image character varying(50),
	description character varying(100),
	uid UUID
	-- FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE orphanage(
	id SERIAL PRIMARY KEY,
	name character varying(50),
	address character varying(100),
	capacity int
);

CREATE TABLE rescued_child(
	name character varying(30),
	age int,
	sex character varying(12),
	height int,
	weight int,
	oid int,
	vid int,
	FOREIGN KEY (oid) REFERENCES orphanage(id),
	FOREIGN KEY (vid) REFERENCES victim(id)
);

CREATE TABLE manager(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	contact bigint,
	oid int,
	-- password character varying(50),
	FOREIGN KEY (oid) REFERENCES orphanage(id)
);

CREATE TABLE missing_reports(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	age int,
	image character varying(50),
	identification character varying(50),
	last_loc character varying(100)
);

CREATE TABLE crime_cell(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	region character varying(100),
	report_id int,
	-- password character varying(50),
	FOREIGN KEY (report_id) REFERENCES missing_reports(id)
);