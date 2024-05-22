CREATE SCHEMA "location";

CREATE SCHEMA "administration";

CREATE SCHEMA "systems";

CREATE TABLE "location"."country" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar(150) NOT NULL
);

CREATE TABLE "location"."department" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar(150) NOT NULL,
  "country_id" int NOT NULL
);

CREATE TABLE "location"."city" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar(150) NOT NULL,
  "department_id" int NOT NULL
);

CREATE TABLE "administration"."identification_type" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar(100) NOT NULL,
  "description" text
);

CREATE TABLE "administration"."person" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "identification_type_id" int NOT NULL,
  "identification" varchar(30) UNIQUE NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "middle_name" varchar(100),
  "first_surname" varchar(100) NOT NULL,
  "second_surname" varchar(100),
  "full_name" varchar(250),
  "genre_type_id" varchar(30),
  "phone" varchar(30),
  "address" text,
  "avatar" text,
  "department_id" int,
  "city_id" int NOT NULL
);

CREATE TABLE "administration"."gender" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "systems"."access_rol" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "rol_id" int,
  "menu_id" int
);

CREATE TABLE "systems"."access_user" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "user_id" int,
  "menu_id" int
);

CREATE TABLE "systems"."menu" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar,
  "route_back" varchar,
  "route_front" varchar,
  "icon" varchar,
  "position" int
);

CREATE TABLE "systems"."sub_menu" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "menu_id" int,
  "name" varchar,
  "route" varchar,
  "icon" varchar,
  "position" int
);

CREATE TABLE "systems"."rol" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "name" varchar
);

CREATE TABLE "systems"."user" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "person_id" int,
  "rol_id" int,
  "email" varchar,
  "password" varchar
);

CREATE INDEX "idx_country_name" ON "location"."country" ("name");

CREATE INDEX "idx_department_country" ON "location"."department" ("country_id");

CREATE INDEX "idx_department_name" ON "location"."department" ("name");

CREATE UNIQUE INDEX "uq_department_country_name" ON "location"."department" ("country_id", "name");

CREATE INDEX "idx_city_department" ON "location"."city" ("department_id");

CREATE INDEX "idx_city_name" ON "location"."city" ("name");

CREATE UNIQUE INDEX "uq_city_department_name" ON "location"."city" ("department_id", "name");

CREATE INDEX "idx_identification_type_name" ON "administration"."identification_type" ("name");

CREATE INDEX "idx_person_city" ON "administration"."person" ("city_id");

CREATE INDEX "idx_person_id_type" ON "administration"."person" ("identification_type_id");

CREATE INDEX "idx_person_names" ON "administration"."person" ("first_surname", "first_name");

CREATE INDEX "idx_person_document_number" ON "administration"."person" ("identification");

ALTER TABLE "location"."department" ADD FOREIGN KEY ("country_id") REFERENCES "location"."country" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "location"."city" ADD FOREIGN KEY ("department_id") REFERENCES "location"."department" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "administration"."person" ADD FOREIGN KEY ("city_id") REFERENCES "location"."city" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "administration"."person" ADD FOREIGN KEY ("identification_type_id") REFERENCES "administration"."identification_type" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "administration"."person" ADD FOREIGN KEY ("genre_type_id") REFERENCES "administration"."gender" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."user" ADD FOREIGN KEY ("person_id") REFERENCES "administration"."person" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."user" ADD FOREIGN KEY ("rol_id") REFERENCES "systems"."rol" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."access_rol" ADD FOREIGN KEY ("rol_id") REFERENCES "systems"."rol" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."access_rol" ADD FOREIGN KEY ("menu_id") REFERENCES "systems"."menu" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."access_user" ADD FOREIGN KEY ("user_id") REFERENCES "systems"."user" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."access_user" ADD FOREIGN KEY ("menu_id") REFERENCES "systems"."menu" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "systems"."sub_menu" ADD FOREIGN KEY ("menu_id") REFERENCES "systems"."menu" ("id") DEFERRABLE INITIALLY IMMEDIATE;
