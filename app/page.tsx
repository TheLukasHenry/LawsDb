// 'use client'
import Image from 'next/image'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SerpAPI } from 'langchain/tools'
import { Calculator } from 'langchain/tools/calculator'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'

import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

// prompt building
// import { useEffect, useState } from 'react'

import {
  SystemChatMessage,
  HumanChatMessage,
  AIChatMessage,
} from 'langchain/schema'

const client = new ChromaClient()

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process?.env?.OPENAI_API_KEY!,
})

export default async function Home() {
  const collection = await client.createCollection({
    name: 'my_collection',
    embeddingFunction: embedder,
  })

  await collection.add({
    ids: ['id1', 'id2'],
    metadatas: [{ source: 'my_source' }, { source: 'my_source' }],
    documents: ['This is a document', 'This is another document'],
  })

  // Streaming
  const chat = new OpenAI({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          process.stdout.write(token)
        },
      },
    ],
  })
  const song = await chat.call(
    'Write me an eminem song about vector databases.'
  )

  let myself = 'I am a 40 years old man making $400000 / year'

  const myPrompt = await chat.call(
    `Give me 10 ways that people owning an LLC in the usa can save money on taxes. ${myself}`
  )

  await collection.add({
    ids: ['id3', 'id4'],
    metadatas: [{ source: 'my_source' }, { source: 'my_source' }],
    documents: [`${song}`, `${myPrompt}`],
  })

  const results = await collection.query({
    n_results: 4,
    query_text: ['Vector databases', 'taxes'],
  })
  console.log('results: ', results)

  // PROMPT BUILDING
  // let country = 'France'
  // const queryTemplate = new PromptTemplate({
  //   template: (input: string) => `What is the capital of ${country}?`,
  //   inputVariables: ['country'],
  // })

  // const documents = await collection.query({
  //   n_results: 2,
  //   query_text: ['This is a query document'],
  // })

  // const [messages, setMessages] = useState([])
  const systemMessage = new SystemChatMessage('Your instruction here')
  const humanMessage = new HumanChatMessage('Your message here')
  const aiMessage = new AIChatMessage('Your message here')
  // Simulate a chat conversation when the component mounts
  // useEffect(() => {
  //   const systemMessage = new SystemChatMessage('Your instruction here')
  //   const humanMessage = new HumanChatMessage('Your message here')
  //   const aiMessage = new AIChatMessage('Your message here')

  //   setMessages([systemMessage, humanMessage, aiMessage])
  // }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main page
      <div>
        <h1>EmVector</h1>
        <div>{song}</div>
      </div>
      <div>
        <h1>TaxAdvice</h1>
        <div>{myPrompt}</div>
      </div>
    </main>
  )
}

// basic example
// const model = new OpenAI({ temperature: 0.9 })
// const template = 'What is a good name for a company that makes {product}?'
// const prompt = new PromptTemplate({
//   template: template,
//   inputVariables: ['product'],
// })
// const chain = new LLMChain({ llm: model, prompt: prompt })
// const res = await chain.call({ product: 'ice cream' })
// console.log(res)

// const res2 = await prompt.format({ product: 'popsicles' })
// console.log(res2)

// const res3 = await model.call(res2)
// console.log(res3)

// Run based on user input
// const model = new OpenAI({ temperature: 0 })
// const tools = [
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     location: 'Austin,Texas,United States',
//     hl: 'en',
//     gl: 'us',
//   }),
//   new Calculator(),
// ]

// const executor = await initializeAgentExecutorWithOptions(tools, model, {
//   agentType: 'zero-shot-react-description',
// })
// console.log('Loaded agent.')

// const input =
//   "Who is Olivia Wilde's boyfriend?" +
//   ' What is his current age raised to the 0.23 power?'
// console.log(`Executing with input "${input}"...`)

// const result = await executor.call({ input })

// console.log(`Got output ${result.output}`)

// // Chains and agents
// const model = new OpenAI({})
// const memory = new BufferMemory()
// const chain = new ConversationChain({ llm: model, memory: memory })
// const res1 = await chain.call({ input: "Hi! I'm Jim." })
// console.log(res1)

// {
//   response: " Hi Jim! It's nice to meet you. My name is AI. What would you like to talk about?"
// }

// const res2 = await chain.call({ input: "What's my name?" })
// console.log(res2)

// {
//   response: ' You said your name is Jim. Is there anything else you would like to talk about?'
// }
