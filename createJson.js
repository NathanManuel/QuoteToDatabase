import fetch from 'node-fetch';
import fs from 'fs';
  
  var obj = {
    content : []
  }
for(var i = 0; i<103; i++){
    
  fetch("https://quotable.io/quotes?page="+i)
  .then(res => res.json())
  .then(data => {
data.results.forEach(element => {
    //extract data from api
    const quote = element.content;
    const author = element.author;
    const tags = element.tags;
     obj.content.push({
       quote: quote,
       author: author,
       tags: tags,
      });
    });
    var jsonObj = JSON.stringify(obj);
    fs.writeFile("page1.json", jsonObj, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    
    console.log("JSON file has been saved.");
    });
}
)
}