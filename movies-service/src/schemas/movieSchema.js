import joi from 'joi';

const movieSchema = joi.object({
    titulo: joi.string()
        .required()
        .min(2)
        .max(150),
    sinopse: joi.string()
        .min(10)
        .max(500),
    duracao: joi.number()
        .integer()
        .min(10),
    dataLancamento: joi.date()
        .required(),
    imagem: joi.string()
        .required()
        .pattern(/https?:\/\/.+\.(jpe?g|png|gif|svg)/i),
    categorias: joi.array().items(joi.string()).required()
})

export default movieSchema;