
import { readFile } from 'fs/promises';
import fb from 'firebase-admin';
import serviceAccount from './key.json'  assert {type: "json"};
import { v4 as uuidv4 } from 'uuid';

let data = JSON.parse(await readFile("page1.json", "utf8"));

fb.initializeApp({
 credential: fb.credential.cert(serviceAccount)
});

const db = fb.firestore(); 

//push items into firestore database
async function push(id,theme,quote,author){
    const quotesDb = db.collection(theme); 
    const res = await quotesDb.doc(id).set({
        quote: quote,
        author: author,
    });
} 
var authorO = "author";
var quoteO = "quote";
var tagsO = "tags";
var id = uuidv4();

data.content.forEach(element => {
    if(element.tags[0] != undefined)
    tagsO = String(element.tags)
    else
    tagsO = "other";
    
    authorO = element.author;
    quoteO = element.quote;
    id = uuidv4();
    push(id,tagsO, quoteO,authorO);
});
