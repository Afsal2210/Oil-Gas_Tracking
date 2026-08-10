import cds from '@sap/cds'

/**
 * Handles incoming stock (oil/gas received into the company).
 */
export function registerStockInHandlers(srv: cds.ApplicationService) {

  srv.before('CREATE', 'StockIns', (req: cds.Request) => {
    const { quantity, product_ID, receivedDate } = req.data as any

    if (!product_ID) {
      return req.error(400, 'Product is required for a stock-in entry')
    }
    if (quantity === undefined || quantity === null || Number(quantity) <= 0) {
      return req.error(400, 'Quantity must be greater than 0')
    }
    if (!receivedDate) {
      req.data.receivedDate = new Date().toISOString().slice(0, 10)
    }
  })

}
