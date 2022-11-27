// MODAL

const feedbackModal = document.createElement("div");
feedbackModal.setAttribute("id", "feedbackModal");

feedbackModal.style.height = "200px";
feedbackModal.style.width = "300px";
feedbackModal.style.border = "1px solid goldenrod";
feedbackModal.style.display = "grid";
feedbackModal.style.gridTemplateColumns = "repeat(3, 1fr)";
feedbackModal.style.position = "absolute";
feedbackModal.style.zIndex = "999999999999999";
feedbackModal.style.bottom = "20px";
feedbackModal.style.right = "20px";

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
neutralConfirmButton.style.display = "none";
neutralConfirmButton.style.gridColumn = "span 3";

// NEGATIVE

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

positive.addEventListener("click", handlePositive);
neutral.addEventListener("click", handleNeutral);
neutralConfirmButton.addEventListener("click", handleNeutralConfirm);

function handlePositive() {
  clearModal();
  console.log("sending positive feedback", {
    ...getData(),
    feedback: "positive",
  });
  document.querySelector("#positiveSuccessMessage").style.display = "block";
  window.setTimeout(
    () => (document.querySelector("#feedbackModal").style.display = "none"),
    5000
  );
}

function handleNeutral() {
  clearModal();
  console.log("sending neutral feedback", {
    ...getData(),
    feedback: "neutral",
  });
  document.querySelector("#neutralPrompt").style.display = "block";
  document.querySelector("#neutralInput").style.display = "block";
  document.querySelector("#neutralConfirmButton").style.display = "block";
}

function handleNeutralConfirm() {
  clearModal();
  console.log("sending neutral feedback", {
    ...getData(),
    feedback: "neutral-comment",
    comment: "",
  });
  document.querySelector("#positiveSuccessMessage").style.display = "block";
  window.setTimeout(
    () => (document.querySelector("#feedbackModal").style.display = "none"),
    5000
  );
}

// HELPERS

function clearModal() {
  [
    document.querySelector("#positiveSuccessMessage"),
    document.querySelector("#neutralPrompt"),
    document.querySelector("#neutralInput"),
    document.querySelector("#neutralConfirmButton"),
  ].forEach((node) => (node.style.display = "none"));
}

function disableButtons() {
  [
    document.querySelector("#positiveSuccessMessage"),
    document.querySelector("#neutralPrompt"),
    document.querySelector("#neutralInput"),
    document.querySelector("#neutralConfirmButton"),
  ].forEach((node) => (node.style.display = "none"));
}

function getData() {
  return {
    host: window.location.host,
    path: window.location.pathname,
    hash: window.location.hash,
    query: window.location.search,
  };
}
