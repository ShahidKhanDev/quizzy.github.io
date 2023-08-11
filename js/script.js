// LOADING SCREEN
const loadingScreen = document.querySelector("[data-loading-screen]");
window.addEventListener("load", () => {
  // remove the loading screen when the page has loaded
  setTimeout(() => {
    loadingScreen.classList.add("hide");
    loadingScreen.remove();
  }, 2000);
});

// SETTINGS ELEMENTS DOM
const settingsPopup = document.querySelector("[data-settings-popup]");
const settingsBtn = document.querySelector("[data-settings-btn]");
const settingsCloseBtn = document.querySelector("[data-settings-close-btn]");
const settingsList = document.querySelector("[data-settings-list]");
const settingsLevelTogglers = document.querySelectorAll("[data-level-toggler]");
const settingsThemeTogglerBtns = document.querySelectorAll(
  "[data-theme-toggler]"
);
const settingsSoundTogglers = document.querySelectorAll("[data-sound-toggler]");
const settingsTotalQuestionsInput = document.querySelector(
  "[data-input-total-questions]"
);
let settingsMaxQuestions = document.querySelector("[data-max-questions]");

const line = document.querySelector(".line");

/**
 * QUIZ DEFAULT SETTINGS
 */
let DefaultTotalQuestions = 10;
const DefaultSettings = {
  level: "easy",
  theme: "light",
  totalQuestions: DefaultTotalQuestions,
  sounds: "on",
};

// Getting quiz settings from the local storage or using defaults
let quizLocalStrSettings = JSON.parse(localStorage.getItem("quizSettings"));
if (!quizLocalStrSettings) {
  quizLocalStrSettings = DefaultSettings;
  localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
}

document.body.setAttribute("data-theme", quizLocalStrSettings.theme);

settingsBtn.addEventListener("click", () => {
  settingsPopup.classList.add("active");
  settingsBtn.classList.add("active");
});

settingsCloseBtn.addEventListener("click", () => {
  settingsPopup.classList.remove("active");
  settingsBtn.classList.remove("active");
});

// LEVEL
settingsLevelTogglers.forEach((levelToggler, index) => {
  levelToggler.addEventListener("click", () => {
    settingsLevelTogglers.forEach((toggler) =>
      toggler.classList.remove("active")
    );
    levelToggler.classList.add("active");

    // Update quiz level settings in localStorage
    const levelSetting = index === 0 ? "easy" : index === 1 ? "medium" : "hard";
    quizLocalStrSettings.level = levelSetting;
    localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
  });
});

// SOUND TOGGLERS
settingsSoundTogglers.forEach((soundToggler, index) => {
  soundToggler.addEventListener("click", () => {
    settingsSoundTogglers.forEach((toggler) =>
      toggler.classList.remove("active")
    );
    soundToggler.classList.add("active");

    // Update sound settings for quiz in localStorage
    const soundSetting = index === 0 ? "on" : "off";
    quizLocalStrSettings.sounds = soundSetting;
    localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
  });
});

// THEME TOGGLERS
settingsThemeTogglerBtns.forEach((themeToggler, index) => {
  themeToggler.addEventListener("click", () => {
    settingsThemeTogglerBtns.forEach((toggler) =>
      toggler.classList.remove("active")
    );
    themeToggler.classList.add("active");
    // Update theme settings for quiz in localStorage
    const themeSetting = index === 0 ? "light" : "dark";
    quizLocalStrSettings.theme = themeSetting;
    localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
    document.body.setAttribute("data-theme", themeSetting);
    document.body.style.transition = "all 0.5s ease";
    settingsPopup.style.transition = "unset";

    setTimeout(() => {
      settingsPopup.style.transition = "0.25s ease";
    });
  });
});

// TOTAL QUESTIONS INPUT
let maxQuestions = settingsTotalQuestionsInput.getAttribute("max");
settingsMaxQuestions.textContent = maxQuestions;

settingsTotalQuestionsInput.addEventListener("input", () => {
  let maxQuestions = +settingsTotalQuestionsInput.getAttribute("max");
  let inputValue = +settingsTotalQuestionsInput.value;

  if (inputValue > maxQuestions) {
    inputValue = maxQuestions; // Limit the input value to the maximum
    settingsTotalQuestionsInput.value = inputValue;
  }
  // update the totalQuestions value saved in the quizSettings in localStorage
  quizLocalStrSettings["totalQuestions"] = inputValue;
  localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
});

// allow numbers only for the input total questions
settingsTotalQuestionsInput.addEventListener("keypress", (event) => {
  const allowedCharacters = /[0-9]/;
  if (!allowedCharacters.test(event.key)) {
    event.preventDefault();
  }
});

// when clicked outside and the input value is null
settingsTotalQuestionsInput.addEventListener("blur", () => {
  if (settingsTotalQuestionsInput.value == "") {
    settingsTotalQuestionsInput.value = DefaultTotalQuestions;
    quizLocalStrSettings["totalQuestions"] = DefaultTotalQuestions;
    localStorage.setItem("quizSettings", JSON.stringify(quizLocalStrSettings));
  }
});

// adding classes according to the quiz settings saved in local Storage
const addActiveClassesToElems = () => {
  if (quizLocalStrSettings) {
    if (quizLocalStrSettings["level"] == "easy") {
      settingsLevelTogglers[0].classList.add("active");
    } else if (quizLocalStrSettings["level"] == "medium") {
      settingsLevelTogglers[1].classList.add("active");
    } else {
      settingsLevelTogglers[2].classList.add("active");
    }

    settingsTotalQuestionsInput.value = quizLocalStrSettings["totalQuestions"];

    quizLocalStrSettings["sounds"] == "on"
      ? settingsSoundTogglers[0].classList.add("active")
      : settingsSoundTogglers[1].classList.add("active");

    quizLocalStrSettings["theme"] == "light"
      ? settingsThemeTogglerBtns[0].classList.add("active")
      : settingsThemeTogglerBtns[1].classList.add("active");
  }
};

// Call addActiveClassesToElems
window.addEventListener("DOMContentLoaded", () => {
  addActiveClassesToElems();
});

// CATEGORY ELEMENTS DOM
const wrapper = document.querySelector("[data-wrapper]");
const categoryCardList = document.querySelector("[data-category-card-list]");
const startQuizBtn = document.querySelector("[data-start-quiz-btn]");

// PROGRESSBAR ELEMENTS DOM
const progressbarContainer = document.querySelector(
  "[data-progressbar-container]"
);

// QUIZ ELEMENTS DOM
const questionCategoryText = document.querySelector(
  "[data-question-category-text]"
);
const questionTitleText = document.querySelector("[data-question-title]");
const questionList = document.querySelector("[data-question-list]");
const questionSkipBtn = document.querySelector("[data-question-skip-btn]");
const questionLifeText = document.querySelector("[data-life-text]");

// QUIT QUIZ ELEMENTS DOM
const quizCloseBtn = document.querySelector("[data-quiz-close-btn]");
const quitQuizPopup = document.querySelector("[data-quit-quiz-popup]");
const quitQuizNoBtn = document.querySelector("[data-quit-quiz-no-btn]");
const quitQuizYesBtn = document.querySelector("[data-quit-quiz-yes-btn]");
const overlay = document.querySelector("[data-overlay]");

quizCloseBtn.addEventListener("click", () => {
  quitQuizPopup.classList.add("active");
  overlay.classList.add("active");
});

// when clicked no do nothing except removing active classes from the overlay and popup
quitQuizNoBtn.addEventListener("click", () => {
  quitQuizPopup.classList.remove("active");
  overlay.classList.remove("active");
});

// when clicked yes then go back to home
quitQuizYesBtn.addEventListener("click", () => {
  quitQuizYesBtn.classList.add("active");

  setTimeout(() => {
    quitQuizYesBtn.classList.remove("active");
    quitQuizNoBtn.click();
    setTimeout(() => {
      location.reload();
    }, 150);
  }, quizStartTime);
});

// QUIZ MESSAGE ELEMETS DOM
const quizMessageContainer = document.querySelector(
  "[data-quiz-message-container]"
);
const quizMessageText = document.querySelector("[data-quiz-message-text]");
const quizMessageIcon = document.querySelector("[data-quiz-message-icon]");
const quizQuestionContinueBtn = document.querySelector(
  "[data-quiz-question-continue-btn]"
);
const quizCorrectAns = document.querySelector("[data-correct-answer]");

// POPUP ELEMENTS DOM
const heartsPopup = document.querySelector("[data-hearts-popup]");
const keepGoBtn = document.querySelector("[data-keep-go-btn]");
const refillHeartsBtn = document.querySelector("[data-refill-hearts-btn]");

// RESULT ELEMETS DOM
const totalQuestionsNum = document.querySelector("[data-total-questions]");
const correctAnswersNum = document.querySelector("[data-correct-answers-num]");
const wrongAnswersNum = document.querySelector("[data-wrong-answers-num]");
const resultContinueBtn = document.querySelector("[data-result-continue-btn]");

const root = document.documentElement;
let categoryId;
let quizStartTime = 2000; //quiz Start time in miliseconds

// array to store available categories
let availabeCategoriesArr = [];

// function to style the available categories which exist in the categories.js
const fetchAvailableCategories = () => {
  fetch("data/questions.json")
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        let categories = data.categories;
        categories.forEach((category) => {
          availabeCategoriesArr.push(category.name); // Assuming the category name is a string
        });
      }

      // after pushing categories in availabeCategoriesArr then call getCategories
      getCategories();
    });
};

// get categories from the categories.js
const getCategories = () => {
  categoriesData.forEach((category) => {
    let categoryItem = `
    <li
      class="category__card-item card-clickable"
      aria-checked="false"
      data-category-card-item
      data-id="${category.id}"
      data-category-name="${category.category_name}"
    >
      <div class="meta">
        <img src="${category.image}" />
        <span class="card__item-text">${category.category_name}</span>
      </div>
    </li>
    `;

    categoryCardList.insertAdjacentHTML("beforeend", categoryItem);
    // allCategoryCards.push(categoryCardList.lastElementChild);
  });

  const allCategoryCards = document.querySelectorAll(".category__card-item");
  allCategoryCards.forEach((categoryCard) => {
    const categoryName = categoryCard.getAttribute("data-category-name");

    // if the category has no questions then add the attribut of empty to the card
    if (!availabeCategoriesArr.includes(categoryName)) {
      categoryCard.setAttribute("data-empty", "");
    }

    categoryCard.addEventListener("click", () => {
      allCategoryCards.forEach((card) =>
        card.setAttribute("aria-checked", false)
      );

      handleClick(categoryCard);
    });
  });
};

fetchAvailableCategories();
// getCategories();

// handle click for category Item
const handleClick = (elem) => {
  elem.setAttribute("aria-checked", true);
  startQuizBtn.setAttribute("aria-checked", true);
  startQuizBtn.removeAttribute("disabled");
  categoryId = elem.dataset.id;
};

// start the quiz after selecting a category
startQuizBtn.addEventListener("click", () => {
  startQuizBtn.classList.add("loading");

  setTimeout(() => {
    startQuizBtn.classList.remove("loading");
    wrapper.classList.add("quiz-loaded");

    // starte the quiz after the start time when the start quiz button is clicked
    getQuizData();
  }, quizStartTime);
});

let CURRENT_QUESTION = 0;
let SCORE = 0;
let MAX_LIVES = 5;
let TOTAL_QUESTIONS = 0;
let CORRECT_ANS = 0;
let WRONG_ANS = 0;
let CORRECT_ANS_TEXT;

// setting up the lives
questionLifeText.textContent = MAX_LIVES;

// fetching the quiz json with the current category Id
const getQuizData = () => {
  fetch("data/questions.json")
    .then((res) => res.json())
    .then((data) => {
      const categoryData = data.categories[categoryId];
      if (categoryData) {
        const questionsData = categoryData.questions[CURRENT_QUESTION];
        if (questionsData) {
          generateQuiz(categoryData, questionsData);
        }
      } else {
        alert("Category not found.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// generate the quiz DOM
const generateQuiz = (categoryData, quizData) => {
  questionCategoryText.textContent = categoryData.name;
  // const questionsData = quizData.questions[CURRENT_QUESTION];
  // const questionsData = quizData.questions;
  const answers = quizData.answers;

  questionTitleText.textContent = quizData.question;
  questionList.innerHTML = "";

  // Shuffle the answers before displaying them
  shuffleArray(answers);
  answers.forEach((ans, i) => {
    let answerItem = `
        <li
        class="question__item card-clickable"
        aria-checked="false"
        data-category-card-item
        data-id="${ans.id}"
        >
        <span class="question__num">${addZero(i + 1)}</span>
        <span class="question__text">${ans.text}</span>
        </li>
        `;

    questionList.insertAdjacentHTML("beforeend", answerItem);
  });

  // adding the click event to each question
  const questionItems = document.querySelectorAll(".question__item");

  questionItems.forEach((questionItem) => {
    questionItem.addEventListener("click", () => {
      checkAnswer(questionItem, categoryData);
    });
  });
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// check the answer whether it's correct or wrong
const checkAnswer = (elem, categoryData) => {
  let selected = questionList.querySelector(".selected");
  if (selected) {
    selected.classList.remove("selected");
  }
  elem.classList.add("selected");

  // when the answer is selected then disable the answer options
  // which means once selected answer cannot be changed again
  disableQuestionItems();

  // get the current id of the answer
  const currentId = +elem.dataset.id;
  // get the answer id from the json
  const correctAnswerId =
    categoryData.questions[CURRENT_QUESTION].correct_answer;
  // get the total questions
  const totalQuestions = categoryData.questions.length - 1;
  TOTAL_QUESTIONS = totalQuestions + 1;

  // getting the correct answer text from the answers
  const answers = categoryData.questions[CURRENT_QUESTION].answers;
  for (let i = 0; i < answers.length; i++) {
    // console.log(answers[i]);
    if (answers[i].id === correctAnswerId) {
      CORRECT_ANS_TEXT = answers[i].text;
    }
  }

  // increase the progressbar width
  incrementProgressbar();

  // checking if the selected answer is correct or wrong
  if (currentId == correctAnswerId) {
    // Handle correct answer
    CORRECT_ANS++;
    handleCorrect();
  } else {
    // Handle incorrect answer
    WRONG_ANS++;
    handleIncorrect();
  }
};

// handle correct
const handleCorrect = () => {
  quizMessageContainer.classList.remove("wrong");
  quizMessageContainer.classList.add("active", "correct");
  quizMessageText.textContent = "Nicely Done!";
  quizMessageIcon.textContent = "done";

  // play the sound for correct
  playSound("correct");
};

// handle incorrect
const handleIncorrect = () => {
  // edit classes for quizContainer
  quizMessageContainer.classList.remove("correct");
  quizMessageContainer.classList.add("active", "wrong");
  quizMessageText.textContent = "Correct Answer:";
  quizMessageIcon.textContent = "close";
  quizCorrectAns.textContent = CORRECT_ANS_TEXT;
  // play the sound for correct
  playSound("wrong");

  // if the user selects a wrong answer so will lose one heart
  MAX_LIVES--;
  // if there are no more lives
  if (MAX_LIVES < 1) {
    heartsPopup.classList.add("active", "no-more-hearts");
  } else {
    questionLifeText.textContent = MAX_LIVES;
    const sessionStoragePopup = sessionStorage.getItem("heartsPopup");
    if (sessionStoragePopup) return;
    sessionStorage.setItem("heartsPopup", true);
    heartsPopup.classList.add("active");
  }
};

// when the continute button inside the correct/wrong message is clicked
quizQuestionContinueBtn.addEventListener("click", () => {
  quizMessageContainer.classList.remove("active", "correct", "wrong");

  CURRENT_QUESTION++;
  getQuizData();
  if (CURRENT_QUESTION === TOTAL_QUESTIONS) {
    wrapper.classList.remove("quiz-loaded");
    wrapper.classList.add("result-loaded");
    showResult();
  }

  // music.src = "";
  // music.currentTime = 0;
});

// show result
const showResult = () => {
  totalQuestionsNum.textContent = TOTAL_QUESTIONS;
  correctAnswersNum.textContent = CORRECT_ANS;
  wrongAnswersNum.textContent = WRONG_ANS;

  // hide the settings button in result
  settingsBtn.style.display = "none";

  // play the sound according to the result
  if (CORRECT_ANS >= WRONG_ANS) {
    playSound("win");
  } else {
    playSound("lose");
  }
};

// restart the quiz when click the result continue btn
resultContinueBtn.addEventListener("click", () => {
  resultContinueBtn.classList.add("loading");

  // restart the quiz
  setTimeout(() => {
    resultContinueBtn.classList.remove("loading");
    settingsBtn.style.display = "flex";

    setTimeout(() => {
      location.reload();
    }, 150);
  }, quizStartTime);
});

// increment progressbar
let currentWidth = 0;
const incrementProgressbar = () => {
  const nextStep = 100 / TOTAL_QUESTIONS;
  currentWidth += nextStep;
  if (currentWidth > 100) {
    currentWidth = 100;
  }
  root.style.setProperty("--progressbar-width", currentWidth + "%");
};

// show the hearts popup and continue
keepGoBtn.addEventListener("click", () => {
  heartsPopup.classList.remove("active");
});

// refill hearts to the max lives
refillHeartsBtn.addEventListener("click", () => {
  MAX_LIVES = 5;
  questionLifeText.textContent = MAX_LIVES;

  heartsPopup.classList.remove("active");

  // remove selected class from the questions
  removeSelected();
});

// remove selected class from questions
const removeSelected = () => {
  document
    .querySelectorAll(".question__item")
    .forEach((question) => question.classList.remove("selected"));
};

// disable all the quetion items when selected
const disableQuestionItems = () => {
  const questionItems = document.querySelectorAll(".question__item");
  questionItems.forEach((item) => item.classList.add("disabled"));
};

// clear session storage when the page is reloaded
window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
});

// add zero the number
const addZero = (n) => {
  return n < 9 ? "0" + n : n;
};

// play sounds
let music = new Audio("");
const playSound = (sound) => {
  const localStrSound = quizLocalStrSettings["sounds"];

  if (localStrSound == "on") {
    music.src = `/assets/sounds/${sound}.mp3`;
    music.play();
  }
};

// copyright year
const dateObj = new Date();
const currentYear = dateObj.getFullYear();
document.querySelector(".copyright__year").textContent = currentYear;
