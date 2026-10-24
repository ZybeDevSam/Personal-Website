// click an image to see it larger, click anywhere or press Esc to close
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".image").forEach((image) => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.showModal();
    });
});

lightbox.addEventListener("click", () => lightbox.close());
