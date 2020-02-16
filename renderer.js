
const novel = "https://www.wuxiaworld.com/novel/the-second-coming-of-gluttony/scog-chapter-1";
const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
    const result = await axios.get(novel);
    return cheerio.load(result.data);
  };



const getChapter = async() => {
    const $ = await fetchData();
    $('.chapter-nav').remove();
    const chapter = $('#chapter-content').html();
    document.body.innerHTML = chapter;
}

getChapter();