import cds from '@sap/cds'

/**
 * Handles master data for oil/gas products.
 */
export function registerProductsHandlers(srv: cds.ApplicationService) {

  srv.before('CREATE', 'Products', (req: cds.Request) => {
    const { name, type } = req.data as any

    if (!name || !String(name).trim()) {
      return req.error(400, 'Product name is required')
    }
    if (!type || !String(type).trim()) {
      return req.error(400, 'Product type is required')
    }
    if (!req.data.unit) {
      req.data.unit = 'Gallons'
    }
  })

}
