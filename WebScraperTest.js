const rp = require('request-promise');
const $ = require('cheerio');
const WebScraperParse = require('./WebScraperParse');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  //Gets the Name and Birthday of Presidents
  .then(function(html){
    //success!
    const wikiUrls = [];
    //Adds href attribute to wikiUrls array
    for (let i = 0; i < 45; i++) {
      wikiUrls.push($('big > a', html)[i].attribs.href);
    }

    //Returns Name and Birthday of Presidents
    return Promise.all(
      wikiUrls.map(function(url) {
        return WebScraperParse('https://en.wikipedia.org' + url);
      })
    );    
  })

  .then(function(presidents) {
    console.log(presidents);
  })

  .catch(function(err){
    //handle error
    console.log(err);
  });