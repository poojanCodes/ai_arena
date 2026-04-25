import { StateSchema, type GraphNode , StateGraph ,START , END} from "@langchain/langgraph";
import z from 'zod';
import { cohereModel, googleModel, mistralModel } from "./ai.model.service.js";
import { createAgent, HumanMessage, providerStrategy } from 'langchain';

const state = new StateSchema({
    problem: z.string().default(''),
    solution_1: z.string().default(''),
    solution_2: z.string().default(''),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(''),
        solution_2_reasoning: z.string().default(''),
    })
});

const solutionNode: GraphNode<typeof state> = async (state) => {
    const [mistralResponse, cohereResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ]);

    return {
        solution_1: mistralResponse.text,
        solution_2: mistralResponse.text,
    }
}

const judgeNode: GraphNode<typeof state> = async (state) => {
    const { problem, solution_1, solution_2 } = state;

    const judge = createAgent({
        model: googleModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string(),
        })),
        systemPrompt: `You are an expert evaluator tasked with comparing two AI-generated solutions.Your job is to evaluate both solutions independently and fairly.
        Evaluation Criteria:
        1. Correctness : Is the solution factually and logically correct?
        2. Completeness :  Does it fully address the problem?
        3. Clarity : Is the explanation clear and easy to understand?
        4. Efficiency : Is the approach optimal (if applicable)?
        5. Relevance : Does it stay on topic and avoid unnecessary information?

        Instructions:
        - Score each solution out of 10 (can use decimals like 7.5).
        - Do NOT compare first — evaluate each solution independently.
        - Be objective and avoid bias toward either solution.
        - Penalize hallucinations, incorrect facts, or missing steps.
        
        Output Format (STRICT):
        Solution 1:
        Score: X/10
        Reasoning: <brief explanation>

        Solution 2:
        Score: X/10
        Reasoning: <brief explanation>

        Final Verdict:
        <Which solution is better and why we should use that solution in 3 lines>
        `
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(`
                Problem : ${problem},
                Solution_1 : ${solution_1},
                Solution_2 : ${solution_2},
                Please evaluate the solutions and provide scores and reasoning
                `)
        ]
    });

    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResponse.structuredResponse;

    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
}

const graph = new StateGraph(state)
    .addNode('solution',solutionNode)
    .addNode('judge_node',judgeNode)
    .addEdge(START , 'solution')
    .addEdge('solution','judge_node')
    .addEdge('judge_node',END)
    .compile()
    

export default async function runGraph(problem : string){
    const result = await graph.invoke({
        problem : problem
    })

    return result
}