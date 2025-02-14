import { z } from 'zod';

// Zod validation schema for the Car model
export const carValidationSchema = z.object({
  body: z.object({
    brand: z.string().nonempty('Brand is required'),
    model: z.string().nonempty('Model is required'),
    year: z
      .number()
      .min(1886, 'Year must be 1886 or later') // Cars were invented around 1886
      .max(
        new Date().getFullYear() + 1,
        'Year cannot be in the distant future',
      ),
    price: z.number().positive('Price must be a positive number'),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
    description: z.string().nonempty('Description is required'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative'),
    inStock: z.boolean(),
  }),
});

export const updateCarSchema = z.object({
  body: z.object({
    price: z.number().positive().optional(),
    quantity: z.number().int().nonnegative().optional(),
  }),
});
