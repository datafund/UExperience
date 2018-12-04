testJSON = {
    researchId: 1,
    questions = [
        {
            id: 0,
            name: "Ali si sam?",
            type: "Binary",
            current: 1,
        },
        {
            id: 1,
            name: 'Ali si bil prisoten v trenutku?',
            type: "Binary",
            current: 1,
        },
        {
            id: 2,
            name: 'Ali si se zavedal svojega telesa?',
            type: "Binary",
            current: 1,
        },
        {
            id: 3,
            name: 'Kaj trenutno doživljaš?',
            type: "Text",
            current: 1,
        },
        {
            id: 4,
            name: 'Kot katera oseba se trenutno počutiš?',
            type: "Tags",
            current: 1,
        },        
        {
            id: 5,
            name: 'Kakšna so tvoja trenutna temeljna čustva?',
            type: "TagsNoAdd",
            possibleAnswers: [
                "Anger",
                "Fear",
                "Disgust",
                "Happiness",
                "Sadness",
                "Surprise",
            ],
            current: 1,
        },        
        {
            id: 6,
            name: 'Kje si trenutno?',
            type: "MultipleChoice",
            possibleAnswers: [
                "Doma",
                "Služba/Šola",
                "Zunaj",
                "Ostalo",
            ],
            current: 1,
        },        
        {
            id: 7,
            name: 'Kako ekstrovertno se počutiš?',
            type: "Slider",
            current: 1,
        },        
    ],
}
