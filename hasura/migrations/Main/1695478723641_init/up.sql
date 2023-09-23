SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.todo_category (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.todo_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todo_category_id_seq OWNED BY public.todo_category.id;
CREATE TABLE public.todo_item (
    id integer NOT NULL,
    list_id integer NOT NULL,
    category_id integer NOT NULL,
    task text NOT NULL,
    checked boolean NOT NULL,
    user_id integer NOT NULL
);
CREATE SEQUENCE public.todo_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todo_item_id_seq OWNED BY public.todo_item.id;
CREATE TABLE public.todo_list (
    id integer NOT NULL,
    list_name text NOT NULL
);
CREATE TABLE public.todo_list_category (
    category_id integer NOT NULL,
    list_id integer NOT NULL
);
CREATE SEQUENCE public.todo_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todo_list_id_seq OWNED BY public.todo_list.id;
CREATE TABLE public."user" (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
ALTER TABLE ONLY public.todo_category ALTER COLUMN id SET DEFAULT nextval('public.todo_category_id_seq'::regclass);
ALTER TABLE ONLY public.todo_item ALTER COLUMN id SET DEFAULT nextval('public.todo_item_id_seq'::regclass);
ALTER TABLE ONLY public.todo_list ALTER COLUMN id SET DEFAULT nextval('public.todo_list_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.todo_category
    ADD CONSTRAINT todo_category_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.todo_list_category
    ADD CONSTRAINT todo_list_category_pkey PRIMARY KEY (category_id, list_id);
ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.todo_category(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_category_id_list_id_fkey FOREIGN KEY (category_id, list_id) REFERENCES public.todo_list_category(category_id, list_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.todo_list(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.todo_list_category
    ADD CONSTRAINT todo_list_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.todo_category(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.todo_list_category
    ADD CONSTRAINT todo_list_category_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.todo_list(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
