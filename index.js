const puppeteer = require("puppeteer");
const axios = require("axios");

// mudar essa msg pela mensagem que vir do wpp
const msg = "mesa digitalizadora";
msg.replace(/ /g, "%20");

const scrapping = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.pelando.com.br/busca?q=${msg}`);

  const response = await axios.get(
    `https://www.pelando.com.br/api/graphql?operationName=SearchOffersQuery&variables=%7B%22query%22%3A%22${msg}%22%2C%22limit%22%3A18%2C%22filters%22%3A%7B%22status%22%3A%22ACTIVE%22%7D%2C%22sortBy%22%3A%22CREATED_AT%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%228f28ad48873aa383599f5649a90433ce9987d02612a9971ee903135046f6afd8%22%7D%7D`  );
  const obj = response.data.data.public.searchOffers.edges;
  const list = [];
  for (key in obj) {
    const links = obj[key].sourceUrl;
    const linksJson = JSON.stringify(links);
    list.push(linksJson);
  }
  console.log(list.slice(0, 5));
};
scrapping();
