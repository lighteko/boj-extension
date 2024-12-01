import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
import requests
import json

options = Options()
driver = webdriver.Edge(options=options)
service = webdriver.EdgeService(log_output="./")
# driver.get('https://www.acmicpc.net/problemset')

result = {}
# pages = driver.find_element(By.CLASS_NAME, 'pagination').find_elements(By.TAG_NAME, 'li')
for i in range(296, 320):
    print("page " + str(i))
    driver.get(f'https://www.acmicpc.net/problemset/{i}')
    problems = driver.find_elements(By.CLASS_NAME, "list_problem_id")
    problems = [int(problem.get_attribute("innerText"))
                for problem in problems]
    for j in range(len(problems)):
        try:
            res = requests.get(
            f'https://solved.ac/api/v3/search/problem?query={problems[j]}&page=1')
            res = res.json()
        except:
            print("ERROR OCCURRED: Cooldown started...")
            j -= 1
            time.sleep(600)
            continue
        result[f"{problems[j]}"] = res["items"][0]["level"] 
    with open("problem_tiers.json", "w") as outfile:
        json.dump(result, outfile)
