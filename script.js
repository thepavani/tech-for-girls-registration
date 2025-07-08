let clickCount = localStorage.getItem("clickCount") || 0;
clickCount = parseInt(clickCount);
const shareBtn = document.getElementById("shareBtn");
const counterDisplay = document.getElementById("clickCounter");
const maxClicks = 5;

function updateCounter() {
  counterDisplay.textContent = `Click count: ${clickCount}/${maxClicks}`;
  if (clickCount >= maxClicks) {
    document.getElementById("shareMessage").textContent =
      "✅ Sharing complete. Please continue.";
    shareBtn.disabled = true;
  }
}

shareBtn.addEventListener("click", () => {
  if (clickCount < maxClicks) {
    clickCount++;
    localStorage.setItem("clickCount", clickCount);
    updateCounter();

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");
  }
});

updateCounter();

// Form submission section
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");

if (localStorage.getItem("formSubmitted") === "true") {
  disableForm();
  document.getElementById("message").textContent =
    "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (clickCount < maxClicks) {
    alert("Please complete WhatsApp sharing (5 times) before submitting.");
    return;
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbwMl-SOHQZv7n31OTRyMcnty7irnXVRW8FQgr3vkSKAtfdfAqdEQOeVgdmBRzxLnfnW/exec";

  const formData = new FormData(form);
  const jsonData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    college: formData.get("college"),
    fileName: formData.get("screenshot")?.name || "Not uploaded"
  };

  fetch(scriptURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
  })
    .then((res) => {
      console.log("Success!");
      localStorage.setItem("formSubmitted", "true");
      disableForm();
      document.getElementById("message").textContent =
        "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    })
    .catch((err) => {
      console.error("Submission failed", err);
      alert("There was a problem submitting your form. Please try again.");
    });
});

function disableForm() {
  const inputs = document.querySelectorAll("input, button, select");
  inputs.forEach((el) => (el.disabled = true));
}
