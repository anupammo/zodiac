if ("pwabuilder-sw" in navigator) {
    window.addEventListener("load", function() {
      navigator.pwabuilder-sw
        .register("./pwabuilder-sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }