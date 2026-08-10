using { oilandgas.db as db } from '../db/schema';

/**
 * Admin service for tracking oil/gas stock-in, sales and users.
 */
service AdminService @(path: '/admin') {

  entity Products as projection on db.Products;
  entity StockIns as projection on db.StockIns;
  entity Sales    as projection on db.Sales;
  entity Users    as projection on db.Users;

}
