function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-Container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-Container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayLesson(data.data);
    });
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((button) => {
    button.classList.remove("active");
    button.classList.add("btn-outline");
  });
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  removeActive();
  const clickedBtn = document.getElementById(`lesson-btn-${id}`);
  clickedBtn.classList.add("active");
  clickedBtn.classList.remove("btn-outline");

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
};

const displayWordDetails = (details) => {
  console.log(details);
  const detailContainer = document.getElementById("details-Container");
  detailContainer.innerHTML = `
                    <div class="">
                        <h2 class="text-2xl font-bold">
                        ${details.word} (<i class="fa-solid fa-microphone"></i> 
                        ${details.pronunciation || ""}
                        )
                        </h2>
                    </div>
                    <div class="">
                        <h2 class=" font-bold">Meaning</h2>
                        <p>${details.meaning || "অর্থ পাওয়া যায়নি"}</p>
                    </div>
                    <div class="">
                        <h2 class="font-bold">Example</h2>
                        <p>${details.sentence || "উদাহরণ পাওয়া যায়নি"}</p>
                    </div>
                    <div class="">
                        <h2 class="font-bold">Synonym</h2>
                        ${(details.synonyms || []).map((synonym) => `<span class=" btn">${synonym}</span>`).join("")}
                    </div>
    `;
  document.getElementById("my_modal_2").showModal();
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-Container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="space-y-4 bg-white rounded-xl shadow-md text-center py-10 px-5">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাই নি"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>

            <div class="font-medium text-2xl font-bangla">"${word.meaning ? word.meaning : "not found"} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn  bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume"></i></button>
            </div>

        </div>

        `;
    wordContainer.append(div);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson);
    const btn = document.createElement("div");
    btn.innerHTML = `

          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open">
          </i> Lesson ${lesson.level_no}</button>

        `;
    levelContainer.append(btn);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWord = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWord);
    });
});
