import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order/order.interface';

const OrderSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  // Enable createdAt and updatedAt timestamps
  {
    timestamps: true,
  },
);

export const OrderModel = model<Order>('Order', OrderSchema);
