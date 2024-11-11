--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

-- Started on 2024-10-31 12:18:40 EDT

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
-- TOC entry 211 (class 1259 OID 25381)
-- Name: events; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.events (
    eventid integer NOT NULL,
    userid character varying(255),
    date date,
    location character varying(255),
    eventtype character varying(255),
    eventdescription text,
    eventtitle character varying(255),
    eventphoto character varying(255),
    eventalttext character varying(255),
    eventgroup character varying(255)

);


ALTER TABLE public.events OWNER TO thanhmai;

--
-- TOC entry 210 (class 1259 OID 25380)
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
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 210
-- Name: events_eventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thanhmai
--

ALTER SEQUENCE public.events_eventid_seq OWNED BY public.events.eventid;


--
-- TOC entry 213 (class 1259 OID 25395)
-- Name: userevents; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.userevents (
    usereventid integer NOT NULL,
    userid character varying(255),
    eventid integer,
    date date,
    location character varying(255),
    eventtype character varying(255),
    eventdescription text,
    eventtitle character varying(255),
    eventphoto character varying(255),
    eventalttext character varying(255),
    eventgroup character varying(255)

);


ALTER TABLE public.userevents OWNER TO thanhmai;

--
-- TOC entry 212 (class 1259 OID 25394)
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
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 212
-- Name: userevents_usereventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thanhmai
--

ALTER SEQUENCE public.userevents_usereventid_seq OWNED BY public.userevents.usereventid;


--
-- TOC entry 209 (class 1259 OID 25375)
-- Name: users; Type: TABLE; Schema: public; Owner: thanhmai
--

CREATE TABLE public.users (
    userid character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO thanhmai;

--
-- TOC entry 3507 (class 2604 OID 25384)
-- Name: events eventid; Type: DEFAULT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events ALTER COLUMN eventid SET DEFAULT nextval('public.events_eventid_seq'::regclass);


--
-- TOC entry 3508 (class 2604 OID 25398)
-- Name: userevents usereventid; Type: DEFAULT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents ALTER COLUMN usereventid SET DEFAULT nextval('public.userevents_usereventid_seq'::regclass);


--
-- TOC entry 3659 (class 0 OID 25381)
-- Dependencies: 211
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.events (eventid, userid, date, location, eventtype, eventdescription, eventtitle, eventphoto, eventalttext, eventgroup) FROM stdin;
82	2	\N	\N	\N	Smile, Entertainment, Thigh, Performing arts, Dance, Fun, Event, Stage equipment, Performance art, Dancer	\N	/1729911551456.jpg	\N	\N
80	google-oauth2|114492981803626744328	2024-10-31						A dancer entertained the audience with a fun and energetic performance, showcasing their skills on stage using various stage equipment, including their lively smile and dynamic thigh movements.	
90	google-oauth2|114492981803626744328	2024-10-31	Oakland, California 	music	Come Out to a fun filled day, where you are able to drink-wine and enjoy a lovely evening with other singles. 	Painting and Staring into each other's eyes 	/1730308696810.jpg	An artist showcasing paintings and fashion designs at a visual arts event, with a focus on smiling and incorporating jewellery and turbans into the ensemble.	students

\.


--
-- TOC entry 3661 (class 0 OID 25395)
-- Dependencies: 213
-- Data for Name: userevents; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.userevents (usereventid, userid, eventid, date, location, eventtype, eventdescription, eventtitle, eventphoto, eventalttext, eventgroup) FROM stdin;
5	google-oauth2|114492981803626744328	80	2024-10-31	Brooklyn, NYC	music	It's a party in the USA -- party like it's the early 2000's. 	Party in the USA 	/1729906060874.jpg	A dancer entertained the audience with a fun and energetic performance, showcasing their skills on stage using various stage equipment, including their lively smile and dynamic thigh movements.	students
6	google-oauth2|114492981803626744328	82	\N	\N	\N	Smile, Entertainment, Thigh, Performing arts, Dance, Fun, Event, Stage equipment, Performance art, Dancer	\N	/1729911551456.jpg	\N	\N

\.


--
-- TOC entry 3657 (class 0 OID 25375)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: thanhmai
--

COPY public.users (userid) FROM stdin;
google-oauth2|114492981803626744328
2
\.


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 210
-- Name: events_eventid_seq; Type: SEQUENCE SET; Schema: public; Owner: thanhmai
--

SELECT pg_catalog.setval('public.events_eventid_seq', 91, true);


--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 212
-- Name: userevents_usereventid_seq; Type: SEQUENCE SET; Schema: public; Owner: thanhmai
--

SELECT pg_catalog.setval('public.userevents_usereventid_seq', 7, true);


--
-- TOC entry 3512 (class 2606 OID 25388)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (eventid);


--
-- TOC entry 3514 (class 2606 OID 25402)
-- Name: userevents userevents_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_pkey PRIMARY KEY (usereventid);


--
-- TOC entry 3510 (class 2606 OID 25379)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3515 (class 2606 OID 25389)
-- Name: events events_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 3517 (class 2606 OID 25408)
-- Name: userevents userevents_eventid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_eventid_fkey FOREIGN KEY (eventid) REFERENCES public.events(eventid);


--
-- TOC entry 3516 (class 2606 OID 25403)
-- Name: userevents userevents_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thanhmai
--

ALTER TABLE ONLY public.userevents
    ADD CONSTRAINT userevents_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2024-10-31 12:18:41 EDT

--
-- PostgreSQL database dump complete
--

