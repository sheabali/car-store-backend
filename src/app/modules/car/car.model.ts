import mongoose, { Schema, Document } from 'mongoose';

// Define the Mongoose schema
const carSchema = new Schema<TCar>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear(),
  },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, required: true },
});

// Export the model
const CarModel = mongoose.model<ICar>('Car', carSchema);
export default CarModel;
