import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  car: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid car ID format (must be a valid MongoDB ObjectId)',
  }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z
    .number()
    .positive({ message: 'Total price must be a positive number' }),
});
