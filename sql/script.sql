-- Adminer 4.8.1 PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) dump

\connect "prueba-full-stack";

DROP TABLE IF EXISTS "accesos";
CREATE TABLE "public"."accesos" (
    "pkey" integer DEFAULT '0' NOT NULL,
    "id_usuario" uuid NOT NULL,
    "timestamp" date NOT NULL,
    CONSTRAINT "accesos_pkey" PRIMARY KEY ("pkey")
) WITH (oids = false);


DROP TABLE IF EXISTS "roles";
CREATE TABLE "public"."roles" (
    "pkey" integer NOT NULL,
    "nombre_perfil" character varying(256) NOT NULL,
    CONSTRAINT "perfiles_pkey" PRIMARY KEY ("pkey")
) WITH (oids = false);

INSERT INTO "roles" ("pkey", "nombre_perfil") VALUES
(0,	'ADMIN'),
(2,	'VISUALIZACION_DASHBOARDS'),
(1,	'AUDITORIA');

DROP TABLE IF EXISTS "roles_usuarios";
DROP SEQUENCE IF EXISTS permisos_pkey_seq;
CREATE SEQUENCE permisos_pkey_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."roles_usuarios" (
    "pkey" integer DEFAULT nextval('permisos_pkey_seq') NOT NULL,
    "id_usuario" uuid NOT NULL,
    "id_perfil" integer NOT NULL,
    CONSTRAINT "permisos_pkey" PRIMARY KEY ("pkey")
) WITH (oids = false);

INSERT INTO "roles_usuarios" ("pkey", "id_usuario", "id_perfil") VALUES
(1,	'd9f205fb-a4fc-45b1-bf4a-9c2a088f7d78',	0),
(2,	'b508c2bb-75bc-4762-a734-0b6037a7c1fb',	2),
(3,	'2bdabe46-fbc5-42ef-9e59-f805bb552f1b',	1),
(4,	'7966d20b-37db-4ff4-8e89-547eaaea1ca0',	2),
(5,	'7966d20b-37db-4ff4-8e89-547eaaea1ca0',	1),
(6,	'e65a7bdf-a089-4f06-881b-ab30d17c5ab8',	1),
(7,	'e65a7bdf-a089-4f06-881b-ab30d17c5ab8',	0);

DROP TABLE IF EXISTS "usuarios";
CREATE TABLE "public"."usuarios" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "nombre_completo" character varying(256) NOT NULL,
    "email" character varying(256) NOT NULL,
    "password" character varying(256) NOT NULL,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "usuarios" ("id", "nombre_completo", "email", "password") VALUES
('7966d20b-37db-4ff4-8e89-547eaaea1ca0',	'Quimera1',	'meruem@hxh.com',	'randompassword'),
('d9f205fb-a4fc-45b1-bf4a-9c2a088f7d78',	'Gerentin McAdminson',	'gerentin.mcadminson@gmail.com',	'randompassword'),
('e65a7bdf-a089-4f06-881b-ab30d17c5ab8',	'QuimeraTest1',	'pitou@hxh.com',	'randompassword'),
('b508c2bb-75bc-4762-a734-0b6037a7c1fb',	'Visualizador',	'sample@mail.com',	'randompassword'),
('2bdabe46-fbc5-42ef-9e59-f805bb552f1b',	'Auditor',	'random@mail.com',	'randompassword'),
('29bb1692-5555-4c8c-9d17-cf1fdcad3c17',	'testeo',	'testeo@gmail.com',	'blablalba');

ALTER TABLE ONLY "public"."accesos" ADD CONSTRAINT "accesos_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES usuarios(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."roles_usuarios" ADD CONSTRAINT "permisos_id_perfil_fkey" FOREIGN KEY (id_perfil) REFERENCES roles(pkey) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."roles_usuarios" ADD CONSTRAINT "permisos_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES usuarios(id) NOT DEFERRABLE;

-- 2023-03-09 01:39:16.122645+00