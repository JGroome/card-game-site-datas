import Joi from "joi";

export const leaderSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  image: Joi.string().uri().required(),
  color: Joi.string().min(3).max(30).required(),
  playstyle: Joi.string().min(3).max(200).required()
});
