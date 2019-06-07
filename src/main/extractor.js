const fetch = require('node-fetch');
import {JSDOM} from 'jsdom';

const searchExtractor = (itemQuery, socket) => {
  const searchQuery = encodeURIComponent(itemQuery)
  console.log(searchQuery, `https://www.amazon.com/s?k=${searchQuery}`)

  return fetch(`https://www.amazon.com/s?k=${searchQuery}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36' }
  })
    .then((res) => res.text())
    .then((html) => {
      const { document } = (new JSDOM(html)).window
      const items = Array.from(document.querySelectorAll(".s-result-list .a-section.a-spacing-medium")).slice(0,3)
      const info = items.map((item) => ({
        name: item.querySelector("h2 span").textContent,
        img: item.querySelector("img").getAttribute('src'),
        price: item.querySelector(".a-price span").textContent
      }))
      console.log("Document", info)
      return info
    })
    .then((info) => socket.emit('resultFound', {searchResults: info}))
}

export {
  searchExtractor
}
