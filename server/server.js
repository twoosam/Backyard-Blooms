import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// POST for account sign up
// POST for account sign in
// GET request for image carousel
app.get('/api/carousel', async (req, res, next) => {
  try {
    const sql = `
    select "imageId",
    "imageUrl"
    from "carousel"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET request for the 3 categories: Plumeria, Assorted, Seeds
app.get('/api/category', async (req, res, next) => {
  try {
    const sql = `
    select "categoryId",
    "name",
    "imageUrl"
    from "category"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET request for the list of products based on what category was selected
app.get('/api/:categoryId/product', async (req, res, next) => {
  try {
    const categoryId = Number(req.params.categoryId);
    if (!categoryId) {
      throw new ClientError(400, 'categoryId must be a positive integer');
    }
    const sql = `
    select "productId",
    "name",
    "price",
    "imageUrl",
    "categoryId"
    from "product"
    where "categoryId" = $1
    `;
    const params = [categoryId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET request for the product that was selected
app.get('/api/:categoryId/product/:productId', async (req, res, next) => {
  try {
    const categoryId = Number(req.params.categoryId);
    if (!categoryId) {
      throw new ClientError(400, 'categoryId must be a positive integer');
    }
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
    select "productId",
    "name",
    "details",
    "price",
    "imageUrl",
    "categoryId"
    from "product"
    where "categoryId" = $1 and "productId" = $2 
    `;
    const params = [categoryId, productId];
    const result = await db.query(sql, params);
    const prodDetails = result.rows[0];
    if (!prodDetails) {
      res.status(404).json(`Either the categoryId or productId does not exist`);
      return;
    }
    res.json(prodDetails);
  } catch (error) {
    next(error);
  }
});

// POST for items that were added to cart
app.post('/api/cart/add', authMiddleware, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ClientError(401, 'not logged in');
    }
    const { productId, quantity } = req.body;
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new ClientError(400, 'ProductId must be a positive integer');
    }
    const sql = `
    insert into "cart" ("userId", "productId", "quantity")
    values ($1, $2, $3)
    returning *
    `;
    const params = [req.user.userId, productId, quantity];
    const result = await db.query(sql, params);
    const itemInCart = result.rows[0];
    res.json(itemInCart);
  } catch (error) {
    next(error);
  }
});

// GET request to display items that were added
app.get('/api/cart/view', authMiddleware, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ClientError(401, 'not logged in');
    }
    const sql = `
    select "product"."imageUrl", "product"."name", "product"."price", "cart"."quantity", "cart"."cartId"
    from "product"
    join "cart" using ("productId")
    where "userId" = $1
    `;
    const params = [req.user.userId];
    const result = await db.query(sql, params);
    const itemInCart = result.rows;
    res.json(itemInCart);
  } catch (error) {
    next(error);
  }
});

// PUT for editing the cart quantity
app.put('/api/cart/:cartId', authMiddleware, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ClientError(401, 'not logged in');
    }
    const cartId = Number(req.params.cartId);
    if (!Number.isInteger(cartId) || cartId <= 0) {
      throw new ClientError(400, 'CartId must be a positive integer');
    }
    const { quantity } = req.body;
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new ClientError(400, 'Quantity must be a positive integer');
    }
    const sql = `
    update "cart"
    set "quantity" = $1
    where "userId" = $2 and "cartId" = $3
    returning *
    `;
    const params = [quantity, req.user.userId, cartId];
    const result = await db.query(sql, params);
    const itemInCart = result.rows[0];
    res.json(itemInCart);
  } catch (error) {
    next(error);
  }
});

// DELETE for removing items from cart
app.delete('/api/cart/:cartId', authMiddleware, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ClientError(401, 'not logged in');
    }
    const cartId = Number(req.params.cartId);
    if (!Number.isInteger(cartId) || cartId <= 0) {
      throw new ClientError(400, 'CartId must be a positive integer');
    }
    const sql = `
    delete from "cart"
    where "cartId" = $1 and "userId" = $2
    returning *
    `;
    const params = [cartId, req.user.userId];
    const result = await db.query(sql, params);
    const removed = result.rows[0];
    if (!removed) {
      throw new ClientError(404, `Item with cartId ${cartId} not found`);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// POST for user to create account
app.post('/api/user/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
    insert into "user" ("username", "hashedPassword")
    values ($1, $2)
    returning "userId", "username"
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// POST for user to sign into their account
app.post('/api/user/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "user"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const user = result.rows[0];
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (error) {
    next(error);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
