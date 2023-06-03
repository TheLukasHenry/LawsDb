// 'use client'

import { OpenAI } from 'langchain/llms/openai'


import { Document } from 'langchain/document'
import { Collection } from '@/chroma/clients/js/src';
import { CharacterTextSplitter, TextSplitter, MarkdownTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";



import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

const client = new ChromaClient()

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process?.env?.OPENAI_API_KEY!,
})

export default async function Home() {
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

  const allCollections = await client.listCollections()
  console.log('allCollections: ', allCollections)


  const lawsCollection = await client.getOrCreateCollection({
    name: "laws",
    embeddingFunction: embedder,
  });


  // const result  = await client.listCollections()
  // console.log('result', result)
  await lawsCollection.delete({
where: {
  type: 'law',
}
  })
  const peek = await lawsCollection.peek({limit: 1});
  console.log('peek: ', peek)
  const count = await lawsCollection.count();
  console.log('count: ', count)



   let myself = 'I am a 40 years old man making $4000 / year'

  const taxPrompt = await chat.call(
    `Give me 10 tips to save money on taxes in usa. ${myself}. Separate each tip by a |`
  )
  const taxCollection = await client.getOrCreateCollection({
    name: "tax_tips",
    embeddingFunction: embedder,
  });
  const taxResults = await taxCollection.query({
    nResults: 1,
    queryTexts: ["low income"],
  });
  console.log("taxResults.documents: ", taxResults.documents);
  const taxCount = await taxCollection.count();
  console.log("taxCount: ", taxCount);

  // const mainFunction = main()


// const query = await lawsCollection.query({
//   nResults: 10, 
//   queryTexts: ["when does congress adjourns"],
// })

// console.log('query: ', query)








  // const song = await chat.call(
  //   'Write me an snoop dogg song about vector databases.'
  // )

  // let myself = 'I am a 40 years old man making $4000 / year'

  // const taxPrompt = await chat.call(
  //   `Give me 10 tips to save money on taxes in usa. ${myself}. Separate each tip by a |`
  // )



  // const splitter = new CharacterTextSplitter({
  //   separator: "|",
  //   chunkSize: 100,
  //   chunkOverlap: 20,
  // });












//   const recursiveTextSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

//   const docs = await recursiveTextSplitter.createDocuments([taxPrompt]);

//   const output = await splitter.createDocuments([taxPrompt]);

// console.log('tips', tips)
// console.log('output', output)
// console.log('docs', docs)


  // const taxCollectionResultTip3 = await taxCollection.query({
  //   n_results: 1,
  //   query_text: ['tax tips'],
  //   where: {
  //     listItem: 3, // query for the third tip
  //   },
  // })
  // console.log('taxCollectionResultTip3', taxCollectionResultTip3)



  // const taxResults = await collection.query({
  //   n_results: 1,
  //   query_text: ['low income'],
  // })

  // const snoopResult = await collection.query({
  //   n_results: 1,
  //   query_text: ['I got the flow'],
  //   where: {
  //     type: 'song',
  //     artist: 'snoop dogg',
  //   },
  // })

  // const snoopVerse1 = await collection.query({
  //   n_results: 1,
  //   query_text: ['I got the flow'],
  //   where: {
  //     type: 'song',
  //     artist: 'snoop dogg',
  //   },

  // })




  // console.log('tax results: ', taxResults)
  // console.log('snoopVerse1: ', snoopVerse1)
  // console.log('snoopResult: ', snoopResult)



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      main page

    </main>
  )
}



const main = async () => {
  const {
    DirectoryLoader,
  } = require("langchain/document_loaders/fs/directory");
  const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
  const { ChromaClient, OpenAIEmbeddingFunction } = require("chromadb");
  const uuid = require("uuid");
  const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
  const fs = require("fs");
  const crypto = require("crypto");
  const { Document } = require("langchain/document");
  const { Collection } = require("chromadb/dist/main/Collection");
  require("dotenv").config();

  const client = new ChromaClient();

  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process?.env?.OPENAI_API_KEY,
  });

  const lawsCollection = await client.getOrCreateCollection({
    name: "laws",
    embeddingFunction: embedder,
  });
  const lawsQuery = await lawsCollection.query({
    index: undefined,
    nResults: 2,
    queryTexts: ["This is a query document"],
  });
  console.log("lawsQuery: ", lawsQuery);

  const loader = new DirectoryLoader("./singlePdf", {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();

  // for (const doc of docs) {
  //   const text = `${doc.pageContent}`;
  //   const hash = crypto.createHash("sha256").update(text).digest("hex");
  //   const metadata = {
  //     ...doc.metadata,
  //     id: hash,
  //   };

  //   const createInput = {
  //     ids: [hash],
  //     documents: [text],
  //     metadatas: metadata,
  //   };

  //   console.log("createInput: ", createInput);
  //   await lawsCollection.add(createInput);
  // }

  // console.log("docs[0]: ", docs[0]);
  // const peek = await lawsCollection.peek();
  // console.log("peek: ", peek);

  // const count = await lawsCollection.count();
  // console.log("count: ", count);

}

















// import { PromptTemplate } from 'langchain/prompts'
// import { LLMChain } from 'langchain/chains'
// import { initializeAgentExecutorWithOptions } from 'langchain/agents'
// import { SerpAPI } from 'langchain/tools'
// import { Calculator } from 'langchain/tools/calculator'
// import { BufferMemory } from 'langchain/memory'
// import { ConversationChain } from 'langchain/chains'


  // await collection.add({
  //   ids: ['songId', 'taxAdviceId'],
  //   metadatas: [
  //     {
  //       source: 'openai_chat',
  //       type: 'song',
  //       topic: 'vector databases',
  //       artist: 'snoop dogg',
  //     },
  //     {
  //       source: 'openai_chat',
  //       type: 'tax_advice',
  //       topic: 'tax',
  //       demographic: '40 years old man making $400000 / year',
  //     },
  //   ],
  //   documents: [`${song}`, `${taxPrompt}`],
  // })



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
// const systemMessage = new SystemChatMessage('Your instruction here')
// const humanMessage = new HumanChatMessage('Your message here')
// const aiMessage = new AIChatMessage('Your message here')
// Simulate a chat conversation when the component mounts
// useEffect(() => {
//   const systemMessage = new SystemChatMessage('Your instruction here')
//   const humanMessage = new HumanChatMessage('Your message here')
//   const aiMessage = new AIChatMessage('Your message here')

//   setMessages([systemMessage, humanMessage, aiMessage])
// }, [])

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
