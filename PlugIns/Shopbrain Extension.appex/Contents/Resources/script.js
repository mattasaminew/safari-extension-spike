document.addEventListener("DOMContentLoaded", function(event) {
  safari.extension.dispatchMessage("extensionLoaded")
  const itemName = document.querySelector("#productTitle").innerText
  console.log("Product title: ", itemName)
                          
  if (window.top === window) {
    const elem = document.createElement("div")
    elem.innerText = "HELLO WORLD"
    const firstChild = document.querySelector('body').firstChild
    document.querySelector('body').insertBefore(elem, firstChild)
  }
                          
  safari.self.addEventListener("message", function(event) {
    console.log("EVENT: ", event)
    if (event.name === "iconClick") {
      safari.extension.dispatchMessage("amazonPageInfo", {"itemName": itemName})
    }
    if (event.name === "resultFound") {
      console.log(event)
      console.log(event.message.searchResults)
      const container = document.createElement("div")
      container.style.position = "absolute"
      container.style.top = "0"
      container.style.right = "0"
      container.style.width = "30%"
      container.style.zIndex = "1000"
      container.style.backgroundColor = "white"
                               
      const searchResults = event.message.searchResults
      searchResults.forEach((result) => {
        console.log("Result", result)
        const item = document.createElement("div")
                               
        const image = document.createElement("img")
        image.setAttribute("src", result.img)
        
        const name = document.createElement("h2")
        name.innerText = result.name
        
        const price = document.createElement("p")
        price.innerText = result.price
                               
        item.append(image)
        item.append(name)
        item.append(price)
                               
        container.append(item)
      })
      
      const firstChild = document.querySelector('body').firstChild
      document.querySelector('body').insertBefore(container, firstChild)
//      document.insertBefore(container)
      // inject results into window
    }
  })
});






