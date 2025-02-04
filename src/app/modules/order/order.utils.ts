import { response } from 'express';
import config from '../../config';
import Shurjopay from 'shurjopay';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);
console.log(shurjopay);

const makePayment = async (paymentPayload: any) => {
  const paymentResult = await shurjopay.makePayment(
    paymentPayload,
    (response) => console.log(response),
    (error) => console.log(error),
  );

  return paymentResult;
};

export const orderUtils = { makePayment };
