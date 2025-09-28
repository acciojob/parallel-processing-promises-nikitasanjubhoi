const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error"); // ✅ This was missing before
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image at ${url}`);
  });
}

function downloadImages() {
  // ✅ Reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loading.style.display = "none";
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      loading.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
