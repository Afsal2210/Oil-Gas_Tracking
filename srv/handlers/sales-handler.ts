import cds from '@sap/cds'

const { SELECT } = cds.ql

/**
 * Handles outgoing stock (oil/gas sold by the company).
 */
export function registerSalesHandlers(srv: cds.ApplicationService) {

  srv.before('CREATE', 'Sales', async (req: cds.Request) => {
    const { quantity, product_ID, soldDate } = req.data as any

    if (!product_ID) {
      return req.error(400, 'Product is required for a sale entry')
    }
    if (quantity === undefined || quantity === null || Number(quantity) <= 0) {
      return req.error(400, 'Quantity must be greater than 0')
    }
    if (!soldDate) {
      req.data.soldDate = new Date().toISOString().slice(0, 10)
    }

    const { StockIns, Sales } = srv.entities as any

    const stockedIn = await SELECT.one.from(StockIns)
      .columns('sum(quantity) as total')
      .where({ product_ID })

    const soldSoFar = await SELECT.one.from(Sales)
      .columns('sum(quantity) as total')
      .where({ product_ID })

    const available = Number(stockedIn?.total || 0) - Number(soldSoFar?.total || 0)

    if (Number(quantity) > available) {
      req.error(400, `Insufficient stock for this product. Available quantity: ${available}`)
    }
  })

}
