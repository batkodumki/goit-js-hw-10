import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = +event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                 reject(delay);
            }
        }, delay);
    });

    form.reset();
    promise
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`
            });
    })
});