// MODAL

const feedbackModal = document.createElement("div");
feedbackModal.setAttribute("id", "feedbackModal");

feedbackModal.style.width = "300px";
feedbackModal.style.border = "1px solid goldenrod";
feedbackModal.style.borderRadius = "4px";
feedbackModal.style.display = "none";
feedbackModal.style.gridTemplateColumns = "repeat(3, 1fr)";
feedbackModal.style.position = "absolute";
feedbackModal.style.zIndex = "999999999999999";
feedbackModal.style.bottom = "20px";
feedbackModal.style.right = "20px";
feedbackModal.style.padding = "16px";

// HEADER

const closeButton = document.createElement("button");
closeButton.innerText = "🞩";
closeButton.style.gridColumn = "3";

const heading = document.createElement("h2");
heading.innerText = "Give us feedback";
heading.style.gridColumn = "span 3";
heading.style.justifySelf = "center";

// BUTTONS

const positive = document.createElement("button");
positive.setAttribute("id", "positive");
positive.innerText = "🙂";
positive.style.fontSize = "2em";

const neutral = document.createElement("button");
neutral.setAttribute("id", "neutral");
neutral.innerText = "😐";
neutral.style.fontSize = "2em";

const negative = document.createElement("button");
negative.setAttribute("id", "negative");
negative.innerText = "☹️";
negative.style.fontSize = "2em";

// POSITIVE

const positiveSuccessMessage = document.createElement("p");
positiveSuccessMessage.setAttribute("id", "positiveSuccessMessage");
positiveSuccessMessage.innerText =
  "Thanks for the feedback! You can close the form or we will do that for you in 5 seconds.";
positiveSuccessMessage.style.display = "none";
positiveSuccessMessage.style.gridColumn = "span 3";

// NEUTRAL

const neutralPrompt = document.createElement("p");
neutralPrompt.setAttribute("id", "neutralPrompt");
neutralPrompt.innerText = "What exactly?";
neutralPrompt.style.display = "none";
neutralPrompt.style.gridColumn = "span 3";

const neutralInput = document.createElement("textarea");
neutralInput.setAttribute("id", "neutralInput");
neutralInput.style.display = "none";
neutralInput.style.gridColumn = "span 3";

const neutralConfirmButton = document.createElement("button");
neutralConfirmButton.setAttribute("id", "neutralConfirmButton");
neutralConfirmButton.innerText = "Send comment";
neutralConfirmButton.style.display = "none";
neutralConfirmButton.style.gridColumn = "span 3";

// NEGATIVE

const negativePrompt = document.createElement("p");
negativePrompt.setAttribute("id", "negativePrompt");
negativePrompt.innerText = "We're sorry, what went wrong?";
negativePrompt.style.display = "none";
negativePrompt.style.gridColumn = "span 3";

const negativeInput = document.createElement("textarea");
negativeInput.setAttribute("id", "negativeInput");
negativeInput.style.display = "none";
negativeInput.style.gridColumn = "span 3";

const negativeConfirmButton = document.createElement("button");
negativeConfirmButton.setAttribute("id", "negativeConfirmButton");
negativeConfirmButton.innerText = "Send comment";
negativeConfirmButton.style.display = "none";
negativeConfirmButton.style.gridColumn = "span 3";

const mailLink = document.createElement("a");

// APPEND TO DOM

feedbackModal.appendChild(closeButton);
feedbackModal.appendChild(heading);
feedbackModal.appendChild(positive);
feedbackModal.appendChild(neutral);
feedbackModal.appendChild(negative);
feedbackModal.appendChild(positiveSuccessMessage);
feedbackModal.appendChild(neutralPrompt);
feedbackModal.appendChild(neutralInput);
feedbackModal.appendChild(neutralConfirmButton);
document.body.append(feedbackModal);

// EVENT HANDLERS

closeButton.addEventListener(
  "click",
  () => (document.querySelector("#feedbackModal").style.display = "none")
);

positive.addEventListener("click", handlePositive);
neutral.addEventListener("click", handleNeutral);
neutralConfirmButton.addEventListener("click", handleNeutralConfirm);

function handlePositive() {
  clearModal();
  disableButtons();
  console.log("sending positive feedback", {
    ...getData(),
    feedback: "positive",
  });
  document.querySelector(
    "#feedbackModal #positiveSuccessMessage"
  ).style.display = "block";
  window.setTimeout(
    () => (document.querySelector("#feedbackModal").style.display = "none"),
    5000
  );
}

function handleNeutral() {
  clearModal();
  disableButtons();
  console.log("sending neutral feedback", {
    ...getData(),
    feedback: "neutral",
  });
  document.querySelector("#feedbackModal #neutralPrompt").style.display =
    "block";
  document.querySelector("#feedbackModal #neutralInput").style.display =
    "block";
  document.querySelector("#feedbackModal #neutralConfirmButton").style.display =
    "block";
}

function handleNeutralConfirm() {
  clearModal();
  console.log("sending neutral feedback", {
    ...getData(),
    feedback: "neutral-comment",
    comment: document.querySelector("#feedbackModal #neutralInput").value,
  });
  document.querySelector(
    "#feedbackModal #positiveSuccessMessage"
  ).style.display = "block";
  window.setTimeout(
    () => (document.querySelector("#feedbackModal").style.display = "none"),
    5000
  );
}

// HELPERS

function clearModal() {
  [
    document.querySelector("#feedbackModal #positiveSuccessMessage"),
    document.querySelector("#feedbackModal #neutralPrompt"),
    document.querySelector("#feedbackModal #neutralInput"),
    document.querySelector("#feedbackModal #neutralConfirmButton"),
  ].forEach((node) => (node.style.display = "none"));
}

function disableButtons() {
  [
    document.querySelector("#feedbackModal #positive"),
    document.querySelector("#feedbackModal #neutral"),
    document.querySelector("#feedbackModal #negative"),
  ].forEach((node) => node.setAttribute("disabled", true));
}

function getData() {
  return {
    host: window.location.host,
    path: window.location.pathname,
    hash: window.location.hash,
    query: window.location.search,
  };
}

function displayRandomly() {
  console.log("sending display of feedback modal", {
    ...getData(),
    name: "displayed-feedback",
  });
  feedbackModal.style.display = "grid";
}

// RUN
displayRandomly();

let currentHref = document.location.href;
const bodyList = document.querySelector("body");

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (currentHref != document.location.href) {
      currentHref = document.location.href;

      document.querySelector("#feedbackModal").style.display = "none";

      displayRandomly();
    }
  });
});

observer.observe(bodyList, { childList: true, subtree: true });
