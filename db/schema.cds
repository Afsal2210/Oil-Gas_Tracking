namespace oilandgas.db;

using { cuid, managed } from '@sap/cds/common';

/**
 * Parent entity - master data for each oil/gas product tracked by the company.
 */
entity Products : cuid, managed {
  name        : String(100)  not null;
  type        : String(50)   not null; // e.g. Crude Oil, Diesel, Petrol, LPG
  unit        : String(20)   default 'Gallons';
  description : String(255);

  stockIns    : Composition of many StockIns on stockIns.product = $self;
  sales       : Composition of many Sales    on sales.product    = $self;
}

/**
 * Child entity - incoming stock (oil/gas received into the company).
 */
entity StockIns : cuid, managed {
  product      : Association to Products not null;
  quantity     : Decimal(15,2) not null; // gallons received
  unitPrice    : Decimal(15,2);
  supplier     : String(100);
  receivedDate : Date;
  remarks      : String(255);
}

/**
 * Child entity - outgoing stock (oil/gas sold by the company).
 */
entity Sales : cuid, managed {
  product     : Association to Products not null;
  quantity    : Decimal(15,2) not null; // gallons sold
  unitPrice   : Decimal(15,2);
  customer    : String(100);
  soldDate    : Date;
  remarks     : String(255);
}

/**
 * Users of the tracking system (admin only, for now).
 */
entity Users : cuid, managed {
  name  : String(100) not null;
  email : String(150) not null;
  role  : String(20)  default 'admin';
}
