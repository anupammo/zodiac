// const container = document.querySelector(".container")
// const coffees = [
//     { name: "Perspiciatis", image: "images/coffee1.webp" },
//     { name: "Voluptatem", image: "images/coffee2.webp" },
//     { name: "Explicabo", image: "images/coffee3.webp" },
//     { name: "Rchitecto", image: "images/coffee4.webp" },
//     { name: " Beatae", image: "images/coffee5.webp" },
//     { name: " Vitae", image: "images/coffee6.webp" },
//     { name: "Inventore", image: "images/coffee7.webp" },
//     { name: "Veritatis", image: "images/coffee8.webp" },
//     { name: "Accusantium", image: "images/coffee9.webp" },
// ]
// const showCoffees = () => {
//     let output = ""
//     coffees.forEach(
//         ({ name, image }) =>
//         (output += `
//                 <div class="card">
//                   <img class="card--avatar" src=${image} />
//                   <h1 class="card--title">${name}</h1>
//                   <a class="card--link" href="#">Taste</a>
//                 </div>
//                 `)
//     )
//     container.innerHTML = output
// }

// document.addEventListener("DOMContentLoaded", showCoffees)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("./serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }