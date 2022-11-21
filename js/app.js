if ("service-workers" in navigator) {
    window.addEventListener("load", function() {
      navigator.service-workers
        .register("./service-workers.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }