const axios = require("axios");
const cheerio = require("cheerio");

var novel = "https://www.wuxiaworld.com/novel/the-second-coming-of-gluttony/scog-chapter-1";
var myNext;

const fetchData = async () => {
    const result = await axios.get(novel);
    return cheerio.load(result.data);
  };

const getChapter = async() => {
    const page = await fetchData();
    page(".chapter-nav").first().remove();
    var nextchapterlink = page(".chapter-nav").attr('href');
    const chapter = page('#chapter-content').html();
    document.body.innerHTML = chapter;
    myNext = novel.slice(0, 26) + nextchapterlink;
    document.getElementsByClassName('chapter-nav')[0].removeAttribute('href');
    document.getElementsByClassName('chapter-nav')[0].setAttribute('onclick', "nextChapter()");
}

getChapter();

function nextChapter()
{
    novel = myNext;
    getChapter();
}