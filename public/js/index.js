const form = document.getElementById("contact-form");

// https://jakejackson.herokuapp.com/send"

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("https://jakejackson.herokuapp.com/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
