// import { AttributeInfo } from "langchain/schema/query_constructor";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import {
//   SelfQueryRetriever,
//   BasicTranslator,
// } from "langchain/retrievers/self_query";
// import { Chroma } from "langchain/vectorstores/chroma";



// import Image from 'next/image'
// import { OpenAI } from 'langchain/llms/openai'
// // import { PromptTemplate } from 'langchain/prompts'
// // import { LLMChain } from 'langchain/chains'
// // import { initializeAgentExecutorWithOptions } from 'langchain/agents'
// // import { SerpAPI } from 'langchain/tools'
// // import { Calculator } from 'langchain/tools/calculator'
// // import { BufferMemory } from 'langchain/memory'
// // import { ConversationChain } from 'langchain/chains'

// import { Document } from 'langchain/document'

// import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

// // prompt building
// // import { useEffect, useState } from 'react'

// // import {
// //   SystemChatMessage,
// //   HumanChatMessage,
// //   AIChatMessage,
// // } from 'langchain/schema'

// const client = new ChromaClient()

// const embedder = new OpenAIEmbeddingFunction({
//   openai_api_key: process?.env?.OPENAI_API_KEY!,
// })

// export default async function Home() {
//   const doc = new Document({ pageContent: 'foo', metadata: { source: '1' } })

//   const docs = [
//     new Document({
//       pageContent:
//         "A bunch of scientists bring back dinosaurs and mayhem breaks loose",
//       metadata: { year: 1993, rating: 7.7, genre: "science fiction" },
//     }),
//     new Document({
//       pageContent:
//         "Leo DiCaprio gets lost in a dream within a dream within a dream within a ...",
//       metadata: { year: 2010, director: "Christopher Nolan", rating: 8.2 },
//     }),
//     new Document({
//       pageContent:
//         "A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea",
//       metadata: { year: 2006, director: "Satoshi Kon", rating: 8.6 },
//     }),
//     new Document({
//       pageContent:
//         "A bunch of normal-sized women are supremely wholesome and some men pine after them",
//       metadata: { year: 2019, director: "Greta Gerwig", rating: 8.3 },
//     }),
//     new Document({
//       pageContent: "Toys come alive and have a blast doing so",
//       metadata: { year: 1995, genre: "animated" },
//     }),
//     new Document({
//       pageContent: "Three men walk into the Zone, three men walk out of the Zone",
//       metadata: {
//         year: 1979,
//         director: "Andrei Tarkovsky",
//         genre: "science fiction",
//         rating: 9.9,
//       },
//     }),
//   ];

//   const attributeInfo: AttributeInfo[] = [
//     {
//       name: "genre",
//       description: "The genre of the movie",
//       type: "string or array of strings",
//     },
//     {
//       name: "year",
//       description: "The year the movie was released",
//       type: "number",
//     },
//     {
//       name: "director",
//       description: "The director of the movie",
//       type: "string",
//     },
//     {
//       name: "rating",
//       description: "The rating of the movie (1-10)",
//       type: "number",
//     },
//     {
//       name: "length",
//       description: "The length of the movie in minutes",
//       type: "number",
//     },
//   ];

//   const embeddings = new OpenAIEmbeddings();
//   const llm = new OpenAI();
//   const documentContents = "Brief summary of a movie";
//   const vectorStore = await Chroma.fromDocuments(docs, embeddings, {
//     collectionName: "a-movie-collection",
//   });
//   const selfQueryRetriever = await SelfQueryRetriever.fromLLM({
//     llm,
//     vectorStore,
//     documentContents,
//     attributeInfo,
//     /**
//      * We need to create a basic translator that translates the queries into a
//      * filter format that the vector store can understand. We provide a basic translator
//      * translator here (which works for Chroma and Pinecone), but you can create
//      * your own translator by extending BaseTranslator abstract class. Note that the
//      * vector store needs to support filtering on the metadata attributes you want to
//      * query on.
//      */
//     structuredQueryTranslator: new BasicTranslator(),
//   });


//   const query1 = await selfQueryRetriever.getRelevantDocuments(
//     "Which movies are less than 90 minutes?"
//   );
//   const query2 = await selfQueryRetriever.getRelevantDocuments(
//     "Which movies are rated higher than 8.5?"
//   );
//   const query3 = await selfQueryRetriever.getRelevantDocuments(
//     "Which movies are directed by Greta Gerwig?"
//   );
//   const query4 = await selfQueryRetriever.getRelevantDocuments(
//     "Which movies are either comedy or drama and are less than 90 minutes?"
//   );
//   // console.log(query1, query2, query3, query4);


















//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       calc page
// {/* <div className="p">query 1: {query1.entries}</div>
// <div className="p">query 2: {query2}</div>
// <div className="p">query 3: {query3}</div>
// <div className="p">query 4: {query4}</div> */}
//     </main>
//   )
// }



