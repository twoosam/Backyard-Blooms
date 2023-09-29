set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "user" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "hashedPassword" text,
  "createdAt" timestamptz
);

CREATE TABLE "category" (
  "categoryId" serial PRIMARY KEY,
  "name" text,
  "imageUrl" text
);

CREATE TABLE "product" (
  "productId" serial PRIMARY KEY,
  "name" text,
  "details" text,
  "price" integer,
  "imageUrl" text,
  "categoryId" integer
);

CREATE TABLE "cart" (
  "userId" integer,
  "productId" integer,
  PRIMARY KEY ("userId", "productId")
);

ALTER TABLE "product" ADD FOREIGN KEY ("categoryId") REFERENCES "category" ("categoryId");

ALTER TABLE "cart" ADD FOREIGN KEY ("userId") REFERENCES "user" ("userId");

ALTER TABLE "cart" ADD FOREIGN KEY ("productId") REFERENCES "product" ("productId");
