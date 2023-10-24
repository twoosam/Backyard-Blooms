# Backyard Blooms

A full stack ecommerce web application for plant lovers who want to buy plumerias and other plants.

## Why I built this

For as long as I rcan remember, my backyard has been filled with plumeria. My dad loves growing and taking care of them and I always enjoyed taking pictures of all the different variations of vibrant flowers. We have so many now that my dad gives them away for free so I thought it would be cool to make a mock application for selling plumeria.

## Technologies Used

- React.js
- PostgreSQL
- Node.js
- Express
- Tailwind CSS
- HTML5
- CSS3
- AWS
- Elastic Beanstalk

## Live Demo

http://final-project-dev22.us-west-1.elasticbeanstalk.com/

## Features

- User can view a catalog of all plants
- User can view details of a specific plant
- User can add a product to their cart
- User can list the products in their cart
- User can change the quantity of a product in their cart
- User can remove a product from their cart
- User can create an account
- User can sign into their account to see the products they added to cart

## Preview

![Alt text](demo_gif1.gif)

#### Getting Started

1. Install all dependencies with `npm install`.

#### Create the database

If your final project will be using a database, create it now.

1. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```
1. Create database (replace `name-of-database` with a name of your choosing)
   ```sh
   createdb name-of-database
   ```
1. In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step
1. While you are editing `server/.env`, also change the value of `TOKEN_SECRET` to a custom value, without spaces.

If your final project will _not_ be using a database, edit `package.json` to remove the `dev:db` script.

#### Start the development servers

1. Start all the development servers with the `"dev"` script:
   ```sh
   npm run dev
   ```
1. Later, when you wish to stop the development servers, type `Ctrl-C` in the terminal where the servers are running.

#### Set up the database

1. In your browser navigate to the site you used for your database design.
1. Export your database as PostgreSQL, this should generate the SQL code for creating your database tables.
   - Reach out to an instructor if you have any issues with this step
1. Copy the generated SQL code and paste it into `database/schema.sql` below the preexisting sql code in the file. The end result should look something like: _(You will likely have more tables)_

   ```SQL
   set client_min_messages to warning;

   -- DANGER: this is NOT how to do it in the real world.
   -- `drop schema` INSTANTLY ERASES EVERYTHING.
   drop schema "public" cascade;

   create schema "public";

   create table "public"."todos" (
       "todoId"      serial,
       "task"        text           not null,
       "isCompleted" boolean        not null,
       "createdAt"   timestamptz(6) not null default now(),
       "updatedAt"   timestamptz(6) not null default now(),
       primary key ("todoId")
   );
   ```

   - **NOTE:** Database design websites do not do a perfect job of generating SQL, so you may need to make some adjustments to your SQL for it to work correctly. In particular, if using DbDesigner, make sure the double quotes around `"public"."table"` are correct. Reach out to your instructor if you need assistance.

1. In a separate terminal, run `npm run db:import` to create your tables
1. Use `pgweb` (at `localhost:8081`) to verify your tables were created successfully
1. In `pgweb` you should see your database and tables; if you do not, stop here and reach out to an instructor for help
1. At this point your database is setup and you are good to start using it. However there is no data in your database, which isn't necessarily a bad thing, but if you want some starting data in your database you need to add insert statements into the `database/data.sql` file. You can add whatever starting data you need/want. Here is an example:
   ```SQL
   insert into "todos" ("task", "isCompleted")
   values
       ('Learn to code', false),
       ('Build projects', false),
       ('Get a job', false);
   ```
1. After any changes to `database/schema.sql` or `database/data.sql` re-run the `npm run db:import` command to update your database. Use `pgweb` to verify your changes were successfully applied
   ![](md.assets/pgweb-with-data.png)

