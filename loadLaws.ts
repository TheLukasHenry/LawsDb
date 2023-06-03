// const main = async () => {
//   const {
//     DirectoryLoader,
//   } = require("langchain/document_loaders/fs/directory");
//   const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
//   const { ChromaClient, OpenAIEmbeddingFunction } = require("chromadb");
//   const uuid = require("uuid");
//   const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
//   const fs = require("fs");

//   const client = new ChromaClient();

//   function generateID() {
//     // Generate a random UUID.
//     return uuid.v4();
//   }

//   const embedder = new OpenAIEmbeddingFunction({
//     openai_api_key: "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",
//   });

//   const lawsCollection = await client.getOrCreateCollection({
//     name: "laws",
//     embeddingFunction: embedder,
//   });
//   const loader = new DirectoryLoader("./pdfs", {
//     ".pdf": (path) => new PDFLoader(path),
//   });

//   const docs = await loader.load();
//   const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

//   // Load upserted documents status from file
//   let upsertedDocs = new Map();
//   if (fs.existsSync("upsertedDocs.json")) {
//     const upsertedDocsData = fs.readFileSync("upsertedDocs.json");
//     upsertedDocs = new Map(JSON.parse(upsertedDocsData));
//   }

//   for (let i = 0; i < docs.length; i++) {
//     const doc = docs[i];

//     if (upsertedDocs.get(doc.fileName)) {
//       console.log(
//         `Document with fileName: ${doc.fileName} already upserted. Skipping...`
//       );
//       continue;
//     }

//     const docsSplit = await textSplitter.createDocuments([doc.pageContent]);

//     for (let j = 0; j < docsSplit.length; j++) {
//       const docSplit = docsSplit[j];
//       const id = generateID();

//       await lawsCollection.upsert({
//         ids: [id],
//         metadatas: [docSplit.metadata],
//         documents: [docSplit.pageContent],
//       });

//       console.log(`Upserted document with ID: ${id}`);
//       // await new Promise((resolve) => setTimeout(resolve, 5000));
//     }

//     // Update and save upserted documents status to file
//     upsertedDocs.set(doc.fileName, true);
//     // fs.writeFileSync("upsertedDocs.json", JSON.stringify([...upsertedDocs]));
//   }
// };

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
  console.log(process.env.OPENAI_API_KEY);
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process?.env?.OPENAI_API_KEY,
  });
  console.log(embedder);
  // const lawsCollection = await client.createCollection({
  //   name: "laws",
  //   embeddingFunction: embedder,
  // });
  const lawsCollection = await client.getCollection({
    name: "laws",
    embeddingFunction: embedder,
  });
  console.log(lawsCollection);
  const lawsQuery = await lawsCollection.query({
    index: undefined,
    nResults: 2,
    queryTexts: ["This is a query document"],
  });
  // await lawsCollection.delete({});
  // console.log("lawsQuery: ", lawsQuery);

  const loader = new DirectoryLoader("./singlePdf", {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await loader.load();

  // for (const doc of docs) {
  //   const text = `${doc.pageContent}`;
  //   const embed = await embedder.generate(text);
  //   const hash = crypto.createHash("sha256").update(text).digest("hex");
  //   const metadata = {
  //     ...doc.metadata,
  //     id: hash,
  //   };

  //   const createInput = {
  //     ids: [hash],
  //     embeddings: [embed], // added await here
  //     documents: [text],
  //     metadatas: metadata,
  //   };

    // console.log("createInput: ", createInput);
    await lawsCollection.add(createInput);
  }

  console.log("docs[0]: ", docs[0]);
  const peek = await lawsCollection.peek({
    limit: 1,
    embedding: docs[0].pageContent,
  });
  console.log("peek: ", peek);

  const count = await lawsCollection.count();
  console.log("count: ", count);

  // const taxCollection = await client.getOrCreateCollection({
  //   name: "tax_collection",
  //   embeddingFunction: embedder,
  // });
  // const taxResults = await taxCollection.query({
  //   nResults: 1,
  //   queryTexts: ["low income"],
  // });
  // console.log("taxResults: ", taxResults);
  // const taxCount = await taxCollection.count();
  // console.log("taxCount: ", taxCount);

  // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  // console.log("docs.length: ", docs.length);
  // console.log("docs[0]: ", docs[0]);

  // for (let i = 0; i < docs.length; i++) {
  //   const doc = docs[i];
  //   const docsSplit = await textSplitter.createDocuments([doc.pageContent]);
  //   for (let j = 0; j < docsSplit.length; j++) {
  //     const docSplit = docsSplit[j];
  //     const hash = crypto
  //       .createHash("sha256")
  //       .update(docSplit.pageContent)
  //       .digest("hex");
  //     const existingDocs = await lawsCollection.get({ ids: [hash] });
  //     if (existingDocs.length === 0) {
  //       await lawsCollection.upsert({
  //         ids: [hash],
  //         metadatas: [docSplit.metadata],
  //         documents: [docSplit.pageContent],
  //       });
  //       console.log(`Upserted document with ID: ${hash}`);
  //     } else {
  //       console.log(`Document with ID ${hash} already exists, skipping upsert`);
  //     }
  //   }
  // }
};

main();
