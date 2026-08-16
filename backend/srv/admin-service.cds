using {oilandgas.db as db} from '../db/schema';

/**
 * Admin service for tracking oil/gas products and users.
 */
service AdminService {

    entity Products as
        projection on db.Products {
            *
        };

    entity Users    as
        projection on db.Users {
            *
        };

}
