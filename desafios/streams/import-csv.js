import { parse } from 'csv-parse';
import fs from 'node:fs';


const databasePath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(databasePath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: false,
  fromLine: 2 // skip the header line
});

async function run() {
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3335/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

   
     await wait(50)
  }
 
}

run()

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

