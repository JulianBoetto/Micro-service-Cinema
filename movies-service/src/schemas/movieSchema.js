import { object, string, number, date, array } from 'joi';

const schema = object({
    titulo: string()
        .required()
        .min(2)
        .max(150),
    sinopse: string()
        .min(10)
        .max(500),
    duracao: number()
        .integer()
        .min(10),
    dataLancamento: date()
        .required(),
    imagem: string()
        .required()
        .pattern(/https?:\/\/.+\.(jpe?g|png|gif|svg)/i),
    categorias: array().items(string()).required()
})

export default schema;