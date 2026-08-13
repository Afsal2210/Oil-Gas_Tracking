namespace oilandgas.db;

using { cuid, managed } from '@sap/cds/common';

/**
 * Master data for each oil/gas product tracked by the company.
 */
entity Products : cuid, managed {
  name            : String(100)  not null;
  type            : String(50)   not null; // e.g. Crude Oil, Diesel, Petrol, LPG
  unit            : String(20)   default 'Gallons';
  description     : String(255);
  price           : Decimal(15,2);
  stockQuantity   : Decimal(15,2) default 0;
  supplier        : String(100);
  storageLocation : String(100);
}

/**
 * Users of the tracking system (admin only, for now).
 */
entity Users : cuid, managed {
  name  : String(100) not null;
  email : String(150) not null;
  role  : String(20)  ;
}
