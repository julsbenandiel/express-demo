type Product = {
  ean: string
  brandId: string
  articleNumber : string
  description : string
  size: string
  color: string
}

type Order = {
  id: string
  retailerId: string
  ean: Product['ean'],
  product?: Product,
  quantity: number,
  purchasedDate: string,
}

const products: Array<Product> = [
 { ean: '1', brandId: 'nike_id', articleNumber: 'art_1', description: 'nike short', size: 'large', color: 'black'},
 { ean: '2', brandId: 'addidas_id', articleNumber: 'art_2', description: 'addidas foot wear', size: '12', color: 'yellow'},
 { ean: '3', brandId: 'puma_id', articleNumber: 'art_3', description: 'puma string bag', size: 'large', color: 'blue'},
 { ean: '4', brandId: 'converse_id', articleNumber: 'art_4', description: 'converse sling bag', size: 'large', color: 'white'},
 { ean: '5', brandId: 'aurora_id', articleNumber: 'art_5', description: 'polo shirt', size: 'xl', color: 'red'},
]

const orders: Array<Order> = [
  // 2023
  { id: '1', retailerId: 'acme_shop_id', ean: '5', quantity: 2, purchasedDate: 'jan 7 2023'},
  { id: '2', retailerId: 'xyz_shop_id', ean: '2', quantity: 1, purchasedDate: 'feb 7 2023'},
  { id: '3', retailerId: 'star_shop_id', ean: '4', quantity: 4, purchasedDate: 'mar 7 2023'},
  { id: '4', retailerId: 'acme_shop_id', ean: '5', quantity: 3, purchasedDate: 'sept 7 2023'},
  { id: '5', retailerId: 'acme_shop_id', ean: '5', quantity: 4, purchasedDate: 'oct 7 2023'},
  { id: '6', retailerId: 'xyz_shop_id', ean: '5', quantity: 1, purchasedDate: 'nov 7 2023'},
  { id: '7', retailerId: 'xyz_shop_id', ean: '5', quantity: 2, purchasedDate: 'dec 7 2023'},
  // 2022
  { id: '7', retailerId: 'acme_shop_id', ean: '1', quantity: 12, purchasedDate: 'jan 7 2022'},
  { id: '8', retailerId: 'xyz_shop_id', ean: '2', quantity: 4, purchasedDate: 'feb 7 2022'},
  { id: '9', retailerId: 'star_shop_id', ean: '3', quantity: 1, purchasedDate: 'mar 7 2022'},
  { id: '10', retailerId: 'acme_shop_id', ean: '5', quantity: 4, purchasedDate: 'sept 7 2022'},
  { id: '11', retailerId: 'acme_shop_id', ean: '4', quantity: 8, purchasedDate: 'oct 7 2022'},
  { id: '12', retailerId: 'xyz_shop_id', ean: '1', quantity: 11, purchasedDate: 'nov 7 2022'},
  // 2021
  { id: '13', retailerId: 'acme_shop_id', ean: '5', quantity: 12, purchasedDate: 'jan 7 2021'},
  { id: '14', retailerId: 'xyz_shop_id', ean: '2', quantity: 4, purchasedDate: 'feb 7 2021'},
  { id: '15', retailerId: 'star_shop_id', ean: '4', quantity: 1, purchasedDate: 'mar 7 2021'},
  { id: '16', retailerId: 'acme_shop_id', ean: '3', quantity: 4, purchasedDate: 'sept 7 2021'},
  { id: '17', retailerId: 'acme_shop_id', ean: '5', quantity: 8, purchasedDate: 'oct 7 2021'},
  { id: '18', retailerId: 'xyz_shop_id', ean: '1', quantity: 11, purchasedDate: 'nov 7 2021'},
  { id: '19', retailerId: 'acme_shop_id', ean: '2', quantity: 7, purchasedDate: 'dec 7 2021'},
]

// 1) db level: populate product.
const ordersWithProduct = orders.map((order) => {
  return {
    ...order,
    product: products.find((p) => p.ean === order.ean)
  }
})

// sample response:
// {
//   id: '1',
//   retailerId: 'acme_shop_id',
//   ean: '5',
//   quantity: 2,
//   purchasedDate: 'jan 7 2023',
//   product: {
//     ean: '5',
//     brandId: 'aurora_id',
//     articleNumber: 'art_5',
//     description: 'polo shirt',
//     size: 'xl',
//     color: 'red'
//   }
// }[]

// 2) group by year, create a map/object to record the year or orders.
const years: Record<string, { color: string, purchasedQuantity: number }[]> = {}

// loop through orders with populated product data
ordersWithProduct.forEach((order) => {

  // get year from purchasedData
  const purchasedYear = order.purchasedDate.split(" ").pop() as string;

  // using guard clause, check if purchasedDate year is not on the year object,
  // initialize if not exists as empty array. 
  if (!years[purchasedYear]) {
    years[purchasedYear] = []
  }

  // find the object with `color` equals to `order.product.color` in years object
  const index = years[purchasedYear].findIndex((item) => item.color === order.product?.color)

  if (index > -1) {
    years[purchasedYear][index].purchasedQuantity += order.quantity;

  } else {
    // add color object if not exists
    years[purchasedYear].push({
      color: order.product?.color as string,
      purchasedQuantity: order.quantity
    })
  }
})

const finalData: {
  year: string,
  popularColors: { 
    color: string,
    purchasedQuantity: number 
  }[]
}[] = [];

Object.keys(years).map((year) => {
  const items = years[year];
  items.sort((a, b) => b.purchasedQuantity - a.purchasedQuantity)

  const top3 = items.splice(0, 3)

  finalData.push({
    year: year,
    popularColors: top3
  })
})