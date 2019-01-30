import json

research_plan = dict()

research_plan["name"] = input("Kakšno je ime raziskovalnega projekta?")
research_plan["description"] = input("Kako bi bolj podrobno opisal, kaj raziskuješ?")
research_plan["organization"] = input("Pod katero organizacijo se izvaja ta raziskava?")
research_plan["days"] = int(input("Koliko dni naj bi oseba sodelovala v raziskavi?"))
research_plan["start"] = input("Kdaj se je/bo raziskava začela? (v YYYY-MM-DD)")
research_plan["end"] = input("Kdaj se bo raziskava končala? (v YYYY-MM-DD)")
research_plan["privacy"] = input(
    "Poleg informacij, ki jih bodo ljudje vpisali, katere informacije se bodo še zbirale?"
)
research_plan["researcher"] = input(
    "Kako je ime raziskovalcu, ki izvaja ta načrt? (ime priimek)"
)
research_plan["email"] = input(
    "Kakšen je elektronski naslov raziskovalca, ki izvaja to raziskavo?"
)

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
importantMomentsOnly = input("Ali ta raziskava vsebuje le pomembne trenutke? (1 za ja)")
if importantMomentsOnly == "1":
    beeps["ImportantMomentsOnly"] = True
else:
    beeps["importantMomentsOnly"] = False
    beeps["dailyBeeps"] = int(
        input(
            "Koliko naključnih bip-ov na dan vklučuje raziskovalni načrt? (0 če bip-i niso povezani s časom)"
        )
    )
    place = input(
        "Na kateri lokaciji naj se sprožijo bip-i (pusti prazno, če ni povezano z lokacijo, drugače vpiši geografsko širino in dolžino, ločeno z vejico)"
    )
    if place:
        beeps["location"] = (element.strip() for element in place.split(","))
    beeps["additionalCriteria"] = False
    # additionalCriteria = input(
    #    "Should different criteria be additive (1 = all need to be true) or not (0=just one needs to be true)"
    # )
    # if additionalCriteria == "1":
    #    beeps["additionalCriteria"] = True
    # else:
    #    beeps["additionalCriteria"] = False

research_plan["beeps"] = beeps

location = input("Ali naj se pri bip-ih shrani lokacija? (1 za ja)")
if location == "1":
    research_plan["location"] = True
else:
    research_plan["location"] = False
descriptive = input(
    "Ali raziskava vsebuje tudi prosto opisno komponentno, ali osebe le odgovorijo na v naprej postavljena vprašanja? (1 za tudi opisno)"
)
if descriptive == "1":
    research_plan["descriptive"] = True
else:
    research_plan["descriptive"] = False

questions = []
still_question = input(
    "Ali raziskava vključuje tudi v naprej postavljena vprašanja? (1 za resnično)"
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
    question["question"] = input("Kako se glasi vprašanje?")
    context = input("Ali je vprašanje iz konteksta ali doživljajsko? (1 za kontekst)")
    if context == "1":
        question["context"] = True
    else:
        question["context"] = False
    type_of_question = input(
        "Kakšen tip vprašanja je to? (1 = Binarno/Y-N, 2 = Vprašanje z več možnimi odgovori, 3 = Tagi, 4 = Tagi brez možnosti dodajanja (vendar se lahko izbere več možnih odgovorov naenkrat), 5 = Slider (vrednosti 1-100), 6 = Prosto besedilo)"
    )
    question["type"] = question_types[type_of_question.strip()]
    if type_of_question == "4" or type_of_question == "2":
        possible_answers = input("Kakšni so možni odgovori? (loči jih z vejico (,))")
        question["possibleAnswers"] = [element.strip() for element in possible_answers]
    question["current"] = 1
    questions.append(question)
    still_question = input("Ali ima raziskovalni načrt še druga vprašanja? (1 za ja)")
    i = i + 1

research_plan["questions"] = questions
research_plan["password"] = ""


final_json = json.dumps(research_plan, sort_keys=True, indent=4)

with open(research_plan["id"] + ".json", "w") as f:
    f.write(final_json)
