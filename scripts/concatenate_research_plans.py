import os
import json

all_files = os.listdir("plans")

all_research_projects = []
for fileName in all_files:
    with open(os.path.join("plans", fileName)) as f:
        content = " ".join(f.readlines())
        content = json.loads(content)
        all_research_projects.append(content)

with open("all_research_projects.json", "w") as f:
    f.write(json.dumps(all_research_projects, sort_keys=True, indent=4))
