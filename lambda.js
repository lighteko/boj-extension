export const handler = async (event) => {
    const problems = event.queryStringParameters?.problems.replaceAll("'","").split(",");
    const levels = [];
    for (let problem of problems) {
      problem = Number.parseInt(problem);
      const res = await fetch(`https://solved.ac/api/v3/search/problem?query=${problem}&page=1`);
      const data = await res.json();
      const level = data["items"][0]["level"];
      levels.push(level);
    }
    return levels;
  };
  