// js/contact.js

const EMAILJS_PUBLIC_KEY  = "f2bHTzVcIjhbkf8U3";
const EMAILJS_SERVICE_ID  = "service_pggsaaf";
const EMAILJS_TEMPLATE_ID = "template_qqs5ict";

const CONTACT_RECIPIENT_PROD = "kavi.fsbball@outlook.com";

document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS SDK non chargé.");
    return;
  }

  // Init APRÈS chargement du SDK
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form = document.querySelector(".contact-form");
  if (!form) return;

  const submitBtn = form.querySelector("button[type='submit']");

  // Zone de statut (accessible)
  let statusEl = document.createElement("p");
  statusEl.className = "form-note";
  statusEl.setAttribute("aria-live", "polite");
  form.appendChild(statusEl);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";

    // Honeypot
    const honeypot = form.querySelector("input[name='website']");
    if (honeypot && honeypot.value.trim() !== "") {
      statusEl.textContent = "Erreur d’envoi.";
      return;
    }

    // Champs
    const name    = document.getElementById("cf-name")?.value.trim() || "";
    const email   = document.getElementById("cf-email")?.value.trim() || "";
    const subject = document.getElementById("cf-subject")?.value.trim() || "";
    const message = document.getElementById("cf-message")?.value.trim() || "";

    // Validations
    if (!name || !email || !subject || !message) {
      statusEl.textContent = "Merci de remplir tous les champs.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = "Adresse email invalide.";
      return;
    }

    // UX anti-spam
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Données pour EmailJS (doivent matcher les variables du template)
    const templateParams = {
      from_name: name,             // {{from_name}}
      reply_to: email,             // {{reply_to}}
      subject: subject,            // {{subject}}
      message: message,            // {{message}}
      to_email: CONTACT_RECIPIENT_PROD
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      statusEl.textContent = "Merci ! Votre message a été envoyé ✅";
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Erreur lors de l’envoi. Réessayez.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });
});
