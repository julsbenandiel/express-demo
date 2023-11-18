import { faker } from "@faker-js/faker"

function makeId(n: number) {
  let add = 1, max = 12 - add;
  
  if (n > max)
    return makeId(max) + makeId(n - max);
  
  max        = Math.pow(10, n+add);
  let min    = max/10;
  let number = Math.floor( Math.random() * (max - min + 1) ) + min;
  
  return ("" + number).substring(add); 
}

function select(options: Array<string | number>): any {
  const index: number =  Math.floor(Math.random() * (options.length - 0) + 0);
  return options[index]
}

function makeCategory(): string {
  const categories: string[] = ["pants", "shirt", "jacket", "shoes", "formal", "casual", "office"]
  
  return select(categories)
}

function makeStocks(): number {
  const stockOptions: number[] = [50, 75, 100, 150, 200, 250, 300]
  return select(stockOptions)
}

function makeColor(): string {
  const colors: string[] = ['blue', 'black', 'brown', 'red', 'green', 'gray', 'white']
  return select(colors)
}

function makeBrandName(): string {
  const brands: string[] = ['Nova', 'Aurora', 'Nike', 'Addidas', 'Terranova', 'Uniqlo', 'H&M', 'Puma']
  return select(brands)
}

function makeProductName() {
  const {product, productAdjective, productMaterial } = faker.commerce;
  return `${productAdjective()} ${productMaterial()} ${product()}`
}

export default {
  makeId,
  makeStocks,
  makeCategory,
  makeColor,
  makeProductName,
  makeBrandName,
}