import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please provide a product name'] },
    description: { type: String, required: [true, 'Please provide a description'] },
    price: { type: Number, required: [true, 'Please provide a price'] },
    image: { type: String, required: [true, 'Please provide an image'] },
    imageData: { type: Buffer, required: false },
  },
  { timestamps: true }
);

export default mongoose.models['Product'] || mongoose.model('Product', productSchema);
