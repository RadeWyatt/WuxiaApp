const axios = require("axios");
const cheerio = require("cheerio");

var novel = "https://www.wuxiaworld.com/novel/the-second-coming-of-gluttony/scog-chapter-1";

var nextChapter;
var prevChapter;
var chapterBody;

const fetchData = async () => {
    const result = await axios.get(novel);
    return cheerio.load(result.data);
  };

const getChapter = async() => {
    const page = await fetchData();

    prevChapter = page(".chapter-nav").first().attr('href');
    nextChapter = page(".chapter-nav").next().attr('href');
    chapterBody = page('#chapter-content').html();

    document.body.innerHTML = chapterBody;

    document.getElementsByClassName('chapter-nav')[0].removeAttribute('href');
    document.getElementsByClassName('chapter-nav')[1].removeAttribute('href');
    document.getElementsByClassName('chapter-nav')[0].setAttribute('onclick', "prev()");
    document.getElementsByClassName('chapter-nav')[1].setAttribute('onclick', "next()");
}

getChapter();

async function prev()
{
    var myPrev = novel.slice(0, 26) + prevChapter;
    novel = myPrev;
    getChapter();
}

async function next()
{
    var myNext = novel.slice(0, 26) + nextChapter;
    novel = myNext;
    getChapter();
}