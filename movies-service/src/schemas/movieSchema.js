import joi from 'joi';

const movieSchema = joi.object({
    title: joi.string()
        .required()
        .min(2)
        .max(150),
    synopsis: joi.string()
        .min(10)
        .max(500),
    duration: joi.number()
        .integer()
        .min(10),
    releaseDate: joi.date()
        .required(),
    image: joi.string()
        .required()
        .pattern(/https?:\/\/.+\.(jpe?g|png|gif|svg)/i),
    categories: joi.array().items(joi.string()).required()
})

export default movieSchema;