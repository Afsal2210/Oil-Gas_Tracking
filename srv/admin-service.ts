import cds from '@sap/cds'
import { registerStockInHandlers } from './handlers/stock-in-handler'
import { registerSalesHandlers } from './handlers/sales-handler'

export = class AdminService extends cds.ApplicationService {
  async init() {
    registerStockInHandlers(this)
    registerSalesHandlers(this)
    return super.init()
  }
}
