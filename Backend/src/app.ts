import express from 'express';
const app = express();
import morgan from 'morgan';
import runGraph from './services/ai.graph.service.js';
import cors from 'cors';
/**
 * Middlewares
 */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors({
    origin : 'http://localhost:5173',
    methods :['GET','POST'],
    credentials : true
}))

/**
 * Using of our Graph
 */

app.get('/',async function(req,res){
    const result = await runGraph('Explain me what is JSONwebToken');

    res.json(result)
});

app.post('/invoke',async function(req,res){
    const {query} = req.body ; 

    const result = await runGraph(query);

    res.status(200).json({
        message : 'Graph executed successfully',
        success : true , 
        data : result
    })
})

export default app ; 

