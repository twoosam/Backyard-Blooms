import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

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
