const MODAL_CLASS = "mood-meter-modal-eda95ce5-2ff6-4ee5-a076-e2094c8c7b55";

(async () => {
  const config = await (await fetch("/mood-meter-config.json"))?.json();
  if (!config) {
    console.error("no config!");
    return;
  }

  var link = document.createElement("link");
  link.href = `${config.staticFiles}/styles.css`;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen,print";

  document.getElementsByTagName("head")[0].appendChild(link);

  const dagnyProFont = new FontFace(
    "dagny-pro",
    `url("${config.staticFiles}/NNDagnyDisplayWebPro.woff")`
  );
  // wait for font to be loaded
  await dagnyProFont.load();
  // add font to document
  document.fonts.add(dagnyProFont);

  const dagnyTextFont = new FontFace(
    "dagny-text",
    `url("${config.staticFiles}/NNDagnyTextWeb.woff")`
  );
  // wait for font to be loaded
  await dagnyTextFont.load();
  // add font to document
  document.fonts.add(dagnyTextFont);

  // MODAL

  const feedbackModal = document.createElement("div");
  feedbackModal.setAttribute("id", "feedbackModal");
  feedbackModal.classList.add(MODAL_CLASS);

  // HEADER

  const headerContainer = document.createElement("div");
  headerContainer.style.display = "grid";
  headerContainer.style.gridTemplateColumns = "1fr 13px";

  const heading = document.createElement("h2");
  heading.innerText = config.localization?.heading || "Give us feedback";
  heading.style.margin = "0";
  heading.style.fontFamily = "dagny-pro";
  heading.style.fontWeight = "500";
  heading.style.fontSize = "24px";
  heading.style.color = "#414141";

  const closeButton = document.createElement("div");
  const svg = await (await fetch(`${config.staticFiles}/cross.svg`))?.text();
  closeButton.innerHTML = svg;
  closeButton.style.cursor = "pointer";

  const introText = document.createElement("p");
  introText.innerText = config.localization?.introText;
  introText.style.margin = "0";
  introText.style.fontFamily = "dagny-text";
  introText.style.fontWeight = "400";
  introText.style.fontSize = "16px";
  introText.style.color = "#414141";
  introText.style.lineHeight = "24px";

  // BUTTONS

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const positive = document.createElement("div");
  positive.setAttribute("id", "positive");
  positive.classList.add("vote-button");
  positive.innerHTML = `${await (
    await fetch(`${config.staticFiles}/smile.svg`)
  )?.text()}<p>${config.localization.positiveButton}</p>`;

  const neutral = document.createElement("div");
  neutral.setAttribute("id", "neutral");
  neutral.classList.add("vote-button");
  neutral.innerHTML = `${await (
    await fetch(`${config.staticFiles}/neutral.svg`)
  )?.text()}<p>${config.localization.neutralButton}</p>`;

  const negative = document.createElement("div");
  negative.setAttribute("id", "negative");
  negative.classList.add("vote-button");
  negative.innerHTML = `${await (
    await fetch(`${config.staticFiles}/negative.svg`)
  )?.text()}<p>${config.localization.negativeButton}</p>`;

  const separator = document.createElement("div");
  separator.width = "1px";
  separator.height = "55px";
  separator.style.backgroundColor = "#D9D9D9";

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

  feedbackModal.appendChild(headerContainer);
  headerContainer.appendChild(heading);
  headerContainer.appendChild(closeButton);

  feedbackModal.appendChild(introText);

  feedbackModal.appendChild(buttonContainer);
  buttonContainer.appendChild(positive);
  buttonContainer.appendChild(separator);
  buttonContainer.appendChild(neutral);
  buttonContainer.appendChild(separator.cloneNode(true));
  buttonContainer.appendChild(negative);

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
    document.querySelector(
      "#feedbackModal #neutralConfirmButton"
    ).style.display = "block";
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
})();
