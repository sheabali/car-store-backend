import { model, Schema } from 'mongoose';
import { TCar } from './car/car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    // Adds createdAt and updatedAt
    timestamps: true,
    versionKey: false,
  },
);

export const CarModel = model<TCar>('Car', carSchema);
