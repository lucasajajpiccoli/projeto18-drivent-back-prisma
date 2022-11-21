import Joi from "joi";

export const getPaymentSchema = Joi.object({
  ticketId: Joi.string().pattern(/^[0-9]+$/, { name: "digits" }).required()
});

export const createOnePayment = Joi.object({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required()
  }).required()
});
