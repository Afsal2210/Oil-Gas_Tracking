import cds from '@sap/cds'
import { registerStockInHandlers } from './handlers/stock-in-handler'
import { registerSalesHandlers } from './handlers/sales-handler'
import { registerProductsHandlers } from './handlers/products-handler'

export = class AdminService extends cds.ApplicationService {
  async init() {
    registerStockInHandlers(this)
    registerSalesHandlers(this)
    registerProductsHandlers(this)
    return super.init()
  }
}
