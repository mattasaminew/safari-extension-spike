document.addEventListener("DOMContentLoaded", function(event) {
                          
  var title = document.querySelector("#productTitle").innerText
  console.log(title)
  console.log("Safari runtime: ", safari)
  safari.extension.dispatchMessage(title);
                          
  if (window.top === window) {
    const elem = document.createElement("div")
    elem.innerText = "HELLO WORLD"
    const firstChild = document.querySelector('body').firstChild
    document.querySelector('body').insertBefore(elem, firstChild)
    // The parent frame is the top-level frame, not an iframe.
    // All non-iframe code goes before the closing brace.
  }
});

safari.self.addEventListener("message", function(event) {
  console.log("EVENT: ", event)
})




