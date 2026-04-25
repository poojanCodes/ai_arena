import dotenv from 'dotenv';
dotenv.config();

type CONFIG = {
    GOOGLE_API_KEY : string , 
    MISTRAL_API_KEY : string , 
    COHERE_API_KEY : string , 
    PORT : number,
}

export const config : CONFIG = {
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY||'',
    COHERE_API_KEY : process.env.COHERE_API_KEY||'',
    MISTRAL_API_KEY : process.env.MISTRAL_API_KEY||'',
    PORT : Number(process.env.PORT) || 3000,
}