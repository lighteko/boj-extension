window.onload = async () => {
  console.log("BOJ-EXTENSION CALLED");
  const table = document.querySelector(".table").childNodes;
  const header = table[0].childNodes[0];
  header.childNodes[0].style = "width: 6%";
  header.childNodes[2].style = "width: 45%";
  header.childNodes[4].style = "width: 11%";
  const body = table[1].childNodes;
  const problems = [];

  for (let tr of body) {
    const pID = tr.querySelector(".list_problem_id").innerText;
    problems.push(pID);
  }
  
  const res = await fetch(
    `https://k6loix5qrsfdjr7lo3jmq6v5vm0ralrw.lambda-url.us-east-2.on.aws/?problems=${problems.toString()}`
  );
  const tier = document.createElement("th");
  tier.innerText = "티어";
  tier.style = "width: 5%";
  header.insertBefore(tier, header.childNodes[0]);
  const levels = await res.json();
  for (let i = 0; i < levels.length; i++) {
    const tr = body[i];
    const level = levels[i];
    const tierBody = document.createElement("td");
    tierBody.innerHTML = `<img src="https://static.solved.ac/tier_small/${level}.svg" alt="${level}-level" />`;
    tr.insertBefore(tierBody, tr.childNodes[0]);
  }
};
