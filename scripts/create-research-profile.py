import json

research_plan = dict()

research_plan["name"] = input("Kakšno je ime raziskovalnega projekta?")
research_plan["description"] = input("Kako bi bolj podrobno opisal, kaj raziskuješ?")
research_plan["organization"] = input("Which organization is overseeing the research?")
research_plan["days"] = input(
    "How many days would the person expect to be involved in this research?"
)
research_plan["start"] = input(
    "When did/will the whole research start? (in YYYY-MM-DD)"
)
research_plan["end"] = input("When will the whole research end? (in YYYY-MM-DD)")
research_plan["privacy"] = input(
    "Besides input, what information will also be collected?"
)
research_plan["researcher"] = input(
    "What is the name of the researcher doing this research? (name lastname)"
)
research_plan["email"] = input("What is the email of the researcher?")

research_plan["id"] = (
    research_plan["researcher"]
    .split(" ")[0]
    .strip()
    .lower()
    .replace("č", "c")
    .replace("š", "s")
    .replace("ž", "z")
    + research_plan["start"][:4]
    + research_plan["name"]
    .split(" ")[0]
    .strip()
    .lower()
    .replace("č", "c")
    .replace("š", "s")
    .replace("ž", "z")
)

research_plan["subjectId"] = None
research_plan["share"] = False

beeps = dict()
importantMomentsOnly = input(
    "Will this research only research the moments the participant chooses himself? (1 for yes)"
)
if importantMomentsOnly == "1":
    beeps["ImportantMomentsOnly"] = True
else:
    beeps["importantMomentsOnly"] = False
    beeps["dailyBeeps"] = input(
        "How many random beeps will the research require? (0 if beeps are not time related)"
    )
    place = input(
        "If beeps will be generated based on the location, which location should be tracked in longitude and latitude? (Press enter for not location related beeps. Location can be found on google maps, click on the place and copy numbers)"
    )
    if place:
        beeps["location"] = (element.strip() for element in place.split(","))
    additionalCriteria = input(
        "Should different criteria be additive (1 = all need to be true) or not (0=just one needs to be true)"
    )
    if additionalCriteria == "1":
        beeps["additionalCriteria"] = True
    else:
        beeps["additionalCriteria"] = False

research_plan["beeps"] = beeps

location = input("Does research require tracking of location? (1 for true)")
if location == "1":
    research_plan["location"] = True
else:
    research_plan["location"] = False
descriptive = input(
    "Does the research also includes the description of experience, or do participants just answer in advance prepared questions? (1 for also descriptive)"
)
if descriptive == "1":
    research_plan["descriptive"] = True
else:
    research_plan["descriptive"] = False

questions = []
still_question = input(
    "Does this research also includes the in advance prepared questions? (1 for true)"
)
question_types = {
    "1": "Binary",
    "2": "MultipleChoice",
    "3": "Tags",
    "4": "TagsNoAdd",
    "5": "Slider",
    "6": "Text",
}

i = 1
while still_question == "1":
    question = dict()
    question["id"] = i
    question["question"] = input("What is the question?")
    context = input("Does question describe the context or experience? (1 for context)")
    if context == "1":
        question["context"] = True
    else:
        question["context"] = False
    type_of_question = input(
        "What type of question is this? (1 = Binary, 2 = Multiple Choice, 3 = Tags, 4 = Multiple Choice with multiple answers, 5 = Slider, 6 = Free Text)"
    )
    question["type"] = question_types[type_of_question.strip()]
    if type_of_question == "4" or type_of_question == "2":
        possible_answers = input(
            "What are the possible answers in this question? (seperate them with comma (,))"
        )
        question["possibleAnswers"] = [element.strip() for element in possible_answers]
    question["current"] = 1
    questions.append(question)
    still_question = input("Are there still additional questions? (1 for yes)")
    i = i + 1

research_plan["questions"] = questions
research_plan["password"] = ""


final_json = json.dumps(research_plan, sort_keys=True, indent=4)

with open(research_plan["id"] + ".json", "w") as f:
    f.write(final_json)
