import express from 'express';
const app = express();
import morgan from 'morgan';
import runGraph from './services/ai.graph.service.js';

/**
 * Middlewares
 */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


/**
 * Using of our Graph
 */

app.get('/',async function(req,res){
    const result = await runGraph('Explain me what is JSONwebToken');

    res.json(result)
})

export default app ; 

