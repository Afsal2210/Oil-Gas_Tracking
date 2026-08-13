import cds from '@sap/cds'
import { registerProductsHandlers } from './handlers/products-handler'

export = class AdminService extends cds.ApplicationService {
  async init() {
    registerProductsHandlers(this)
    return super.init()
  }
}
