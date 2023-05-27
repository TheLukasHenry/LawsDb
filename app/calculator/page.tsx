import { OpenAI } from 'langchain/llms/openai'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SerpAPI } from 'langchain/tools'
import { Calculator } from 'langchain/tools/calculator'

export default async function page() {
  const model = new OpenAI({ temperature: 0 })
  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: 'Austin,Texas,United States',
      hl: 'en',
      gl: 'us',
    }),
    new Calculator(),
  ]

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: 'zero-shot-react-description',
  })
  console.log('Loaded agent.')

  const input =
    "Who is Olivia Wilde's boyfriend?" +
    ' What is his current age raised to the 0.23 power?'
  console.log(`Executing with input "${input}"...`)

  const result = await executor.call({ input })

  console.log(`Got output ${result.output}`)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
