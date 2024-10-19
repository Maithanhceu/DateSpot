--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.events (
    eventid integer NOT NULL,
    creatorid integer,
    date date NOT NULL,
    location character varying(255),
    eventtype character varying(255),
    eventdescription text NOT NULL,
    eventtitle character varying(255),
    eventphoto character varying(255)
);


ALTER TABLE public.events OWNER TO thanhmai;

--
-- Name: events_eventid_seq; Type: SEQUENCE; Schema: public; Owner: thanhmai
--

CREATE SEQUENCE public.events_eventid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_eventid_seq OWNER TO thanhmai;

--
-- Name: events_eventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thanhmai
--

ALTER SEQUENCE public.events_eventid_seq OWNED BY public.events.eventid;


--
-- Name: userevents; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.userevents (
    usereventid integer NOT NULL,
    userid integer,
    eventid integer,
    date date,
    location character varying(255),
    eventtype character varying(255),
    eventdescription text,
    eventtitle character varying(255),
    eventphoto character varying(255)
);


ALTER TABLE public.userevents OWNER TO thanhmai;

--
-- Name: userevents_usereventid_seq; Type: SEQUENCE; Schema: public; Owner: thanhmai
--

CREATE SEQUENCE public.userevents_usereventid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userevents_usereventid_seq OWNER TO thanhmai;

--
-- Name: userevents_usereventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thanhmai
--

ALTER SEQUENCE public.userevents_usereventid_seq OWNED BY public.userevents.usereventid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255)
);


ALTER TABLE public.users OWNER TO thanhmai;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: thanhmai
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO thanhmai;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thanhmai
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: events eventid; Type: DEFAULT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events ALTER COLUMN eventid SET DEFAULT nextval('public.events_eventid_seq'::regclass);


--
-- Name: userevents usereventid; Type: DEFAULT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents ALTER COLUMN usereventid SET DEFAULT nextval('public.userevents_usereventid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.events (eventid, creatorid, date, location, eventtype, eventdescription, eventtitle, eventphoto) FROM stdin;
1	1	2024-11-13	Brooklyn	Comedy Show	A fun comedy show	Live, Laugh, Love	/Comedy_show.jpg
\.


--
-- Data for Name: userevents; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.userevents (usereventid, userid, eventid, date, location, eventtype, eventdescription, eventtitle, eventphoto) FROM stdin;
1	1	1	2024-11-13	Brooklyn	Comedy Show	A fun comedy show	Live, Laugh, Love	/Comedy_show.jpg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.users (userid, username, password, firstname, lastname, email) FROM stdin;
1	mai	maifantastic	Mai	M.	ttmai@my.loyno.edu
3	kim4possible	callmebeepme	kim	possible	kim4possible@gmail.com
\.


--
-- Name: events_eventid_seq; Type: SEQUENCE SET; Schema: public; Owner: thanhmai
--

SELECT pg_catalog.setval('public.events_eventid_seq', 2, true);


--
-- Name: userevents_usereventid_seq; Type: SEQUENCE SET; Schema: public; Owner: thanhmai
--

SELECT pg_catalog.setval('public.userevents_usereventid_seq', 9, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: thanhmai
--

SELECT pg_catalog.setval('public.users_userid_seq', 3, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (eventid);


--
-- Name: userevents userevents_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_pkey PRIMARY KEY (usereventid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: events events_creatorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_creatorid_fkey FOREIGN KEY (creatorid) REFERENCES public.users(userid);


--
-- Name: userevents userevents_eventid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_eventid_fkey FOREIGN KEY (eventid) REFERENCES public.events(eventid);


--
-- Name: userevents userevents_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

