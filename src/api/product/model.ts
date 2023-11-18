import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { Product } from './interface'

const productSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  gtin: String,
  stock: String,
  color: String,
  image: String,
  price: Number, 
}, {
  timestamps: true,
})

export default mongoose.model<Product>('product', productSchema)