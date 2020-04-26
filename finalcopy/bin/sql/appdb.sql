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
	lat float,
	lng float,
	image character varying(50),
	description character varying(100),
	uid character varying(100),
	ccid integer,
	oid integer
	-- FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE orphanage(
	id SERIAL PRIMARY KEY,
	name character varying(50),
	lat float,
	lng float,
	capacity int
);

CREATE TABLE rescued_child(
	id SERIAL PRIMARY KEY,
	lat float,
	age int,
	sex character varying(12),
	lng float,
	oid int,
	vid int,
	FOREIGN KEY (oid) REFERENCES orphanage(id)

);

CREATE TABLE manager(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	contact bigint,
	oid int,
	email character varying(50),
	password character varying(50),
	FOREIGN KEY (oid) REFERENCES orphanage(id)
);

CREATE TABLE missing_reports(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	age int,
	image character varying(50),
	identification character varying(50),
	lat float,
	lng float
);

CREATE TABLE crime_cell(
	id SERIAL PRIMARY KEY,
	name character varying(30),
	lat float,
	lng float,
	report_id int,
	email character varying(50),
	
	password character varying(50)
	
);