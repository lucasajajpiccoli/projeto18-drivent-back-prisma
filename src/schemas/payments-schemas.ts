import Joi from "joi";

export const getPaymentSchema = Joi.object({
  ticketId: Joi.string().pattern(/^[0-9]+$/, { name: "digits" }).required()
});
