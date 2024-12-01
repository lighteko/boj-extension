window.onload = async () => {
  console.log("BOJ-EXTENSION CALLED");
  const table = document.querySelector(".table").childNodes;
  const header = table[0].childNodes[0];
  header.childNodes[0].style = "width: 6%";
  header.childNodes[1].style = "width: 49%";
  header.childNodes[3].style = "width: 7%";
  const body = table[1].childNodes;
  const problems = [];

  for (let tr of body) {
    const pID = tr.querySelector(".list_problem_id").innerText;
    problems.push(pID);
  }

  const res = await fetch(chrome.runtime.getURL("problems.json"));
  const tier = document.createElement("th");
  tier.innerText = "티어";
  tier.style = "width: 5%";
  header.insertBefore(tier, header.childNodes[0]);
  const levels = await res.json();
  for (let i = 0; i < problems.length; i++) {
    const tr = body[i];
    const level = levels[problems[i]];
    const tierBody = document.createElement("td");
    tierBody.innerHTML = `<img src="https://static.solved.ac/tier_small/${level}.svg" alt="${level}-level" />`;
    tr.insertBefore(tierBody, tr.childNodes[0]);
  }
};
