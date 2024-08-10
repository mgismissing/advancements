function searchButtonListener() {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        window.location.href = `?u=${encodeURIComponent(searchTerm)}`;
    } else {
        window.location.href = `?u=${encodeURIComponent("*all")}`;
    }
};

function getParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function mainGuideDisplay() {
    addSection("Come funziona?", "Questo sito è stato progettato per permettere alle persone di condividere degli \"obiettivi\" e sfidarsi per completarne altri.");
    addSection("Cosa sono gli obiettivi?", "Un obiettivo è caratterizzato da una rarità (Maledizione, Iniziale, Comune, Raro, Epico, Leggendario e Speciale) e un requisito, che va completato per ottenerlo. Il nome e l'icona sono solamente decorativi e non vanno considerati nel suo completamento.");
    addSection("Tipi di obiettivi", "Ci sono 3 tipi di obiettivi: normale, in serie e aggiuntivi.");
    addSection("Gli obiettivi normali", "Qualsiasi obiettivo che non abbia una + o un numero romano alla fine del nome è normale. Questo tipo non necessita di spiegazioni aggiuntive: si sblocca quando viene raggiunto.");
    addCustomGoal("Esempio", "Salta 3 volte", "../img/placeholder.png", "common");
    addSection("Gli obiettivi in serie", "Se un obiettivo ha un numero romano alla fine del nome fa parte di una serie. Un obiettivo in serie funziona come uno normale, ad eccezione del fatto che un obiettivo con un numero più elevato sarà completabile solo quando quello precedente viene completato.");
    addCustomGoal("Esempio I", "Salta 3 volte", "../img/placeholder.png", "common");
    addCustomGoal("Esempio II", "Salta 5 volte", "../img/placeholder.png", "common");
    addText("In questo caso, va prima completato Esempio I e poi si potrà completare Esempio II.")
    addSection("Gli obiettivi aggiuntivi", "Se un obiettivo ha un + alla fine del nome è aggiuntivo. Un obiettivo aggiuntivo completerà automaticamente il suo obiettivo normale.");
    addCustomGoal("Esempio", "Salta 3 volte", "../img/placeholder.png", "common");
    addCustomGoal("Esempio+", "Salta 3 volte con una gamba sola", "../img/placeholder.png", "common");
    addText("In questo caso, se viene completato Esempio+ verrà automaticamente completato anche Esempio.")
    addSection("Come usiamo le tue informazioni", "Video: i video che mandi come prova verranno visti solamente dal proprietario del sito e successivamente archiviati nei server di Google. Leggi l'informativa sulla privacy di Google per saperne di più.")
    
}

function mainGoalDisplay() {
    if (getParam("u") == null || getParam("u") == "") {
        window.location.href = `?u=${encodeURIComponent("*all")}`;
    }
    
    let all_goals = []
    for (const goal in goals) {
        if (goals[goal].rarity !== "special" && goals[goal].rarity !== "unique") {
            all_goals += goal
        }
    }
    
    if (getParam("u") in people) {
        document.getElementById("title").innerHTML = `Obiettivi:<br>${getParam("u")}`;
        for (let i = 0; i < people[getParam("u")].length; i++) {
            const goal = people[getParam("u")][i];
            if (goals[goal].rarity !== "unique") {
                addGoal(goal);
            }
        }
        addSection("Obiettivi speciali", "Qui ci sono degli obiettivi speciali che vengono aggiunti automaticamente.")
        let specialGoalsPresent = false;
        if (people[getParam("u")].includes("Bagnante") && people[getParam("u")].includes("Escursionista")) {
            addGoal("Esploratore");
            specialGoalsPresent = true;
        }
        if (people[getParam("u")] == all_goals) {
            addGoal("Veterano");
            specialGoalsPresent = true;
        }
        
        if (!specialGoalsPresent) {
            addText("Purtroppo non hai nessun obiettivo speciale.")
        }
        
        addSection("Obiettivi unici", "Qui trovi gli obiettivi che ottieni dal creatore del sito in persona.")
        let uniqueGoalsPresent = false;
        for (let i = 0; i < people[getParam("u")].length; i++) {
            const goal = people[getParam("u")][i];
            if (goals[goal].rarity == "unique") {
                addGoal(goal);
                uniqueGoalsPresent = true;
            }
        }
        
        if (!uniqueGoalsPresent) {
            addText("Purtroppo non hai nessun obiettivo unico.")
        }
    } else if (!(getParam("u") in people) && !(getParam("u") == "*all")) {
        document.getElementById("title").innerHTML = `Obiettivi:<br>${getParam("u")}`;
        addText("Questa persona non si è ancora registrata.");
    } else {
        document.getElementById("title").innerHTML = `Tutti gli obiettivi`;
        for (const goal in goals) {
            addGoal(goal);
        }
    }
};

function addGoal(goal) {
    const goalsContainer = document.getElementById("goals-container");
    
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("goal");

    const goalImage = document.createElement("img");
    goalImage.src = `img/${goals[goal].image}.png`;
    goalDiv.appendChild(goalImage);

    const goalTitle = document.createElement("h2");
    goalTitle.textContent = goal;
    goalDiv.appendChild(goalTitle);
            
    const goalRarity = document.createElement("p");
    goalRarity.textContent = rarities[goals[goal].rarity];
    goalRarity.classList.add("rarity")
    goalRarity.classList.add(goals[goal].rarity)
    goalDiv.appendChild(goalRarity);

    const goalDescription = document.createElement("p");
    goalDescription.textContent = goals[goal].description;
    goalDescription.classList.add("desc")
    goalDiv.appendChild(goalDescription);

    goalsContainer.appendChild(goalDiv);
}

function addCustomGoal(name, desc, icon, rarity) {
    const goalsContainer = document.getElementById("goals-container");
    
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("goal");
    goalDiv.classList.add("goal-custom");

    const goalImage = document.createElement("img");
    goalImage.src = icon;
    goalDiv.appendChild(goalImage);

    const goalTitle = document.createElement("h2");
    goalTitle.textContent = name;
    goalDiv.appendChild(goalTitle);
            
    const goalRarity = document.createElement("p");
    goalRarity.textContent = rarities[rarity];
    goalRarity.classList.add("rarity")
    goalRarity.classList.add(rarity)
    goalDiv.appendChild(goalRarity);

    const goalDescription = document.createElement("p");
    goalDescription.textContent = desc;
    goalDescription.classList.add("desc")
    goalDiv.appendChild(goalDescription);

    goalsContainer.appendChild(goalDiv);
}

function addSection(name, desc) {
    const goalsContainer = document.getElementById("goals-container");
    
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("section");

    const goalTitle = document.createElement("h2");
    goalTitle.textContent = name;
    goalDiv.appendChild(goalTitle);
    
    const goalDescription = document.createElement("p");
    goalDescription.textContent = desc;
    goalDescription.classList.add("text")
    goalDiv.appendChild(goalDescription);

    goalsContainer.appendChild(goalDiv);
}

function addText(text) {
    const goalsContainer = document.getElementById("goals-container");
    
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("text");
    
    const goalDescription = document.createElement("p");
    goalDescription.textContent = text;
    goalDescription.classList.add("text")
    goalDiv.appendChild(goalDescription);

    goalsContainer.appendChild(goalDiv);
}

const rarities = {
    "curse": "Maledizione",
    "starter": "Iniziale",
    "common": "Comune",
    "rare": "Raro",
    "epic": "Epico",
    "legendary": "Leggendario",
    "special": "Speciale",
    "unique": "Unico",
};
const goals = {
    "Aristocratico I": {
        "description": "Prendi 10 alle medie.",
        "image": "aristocratico_1",
        "rarity": "common",
    },
    "Aristocratico II": {
        "description": "Prendi 10 alle superiori.",
        "image": "aristocratico_2",
        "rarity": "rare",
    },
    "Bagnante": {
        "description": "Dormi al mare.",
        "image": "bagnante",
        "rarity": "rare",
    },
    "Boykisser": {
        "description": "Vai in una convenzione furry.",
        "image": "boykisser",
        "rarity": "epic",
    },
    "Boykisser+": {
        "description": "Vai in una convenzione furry indossando una fursuit.",
        "image": "boykisser_plus",
        "rarity": "legendary",
    },
    "Debugger": {
        "description": "Trova un bug in questo sito e segnalalo.",
        "image": "debugger",
        "rarity": "legendary",
    },
    "Delinquente": {
        "description": "Prendi un richiamo individuale.",
        "image": "delinquente",
        "rarity": "curse",
    },
    "Delinquenti": {
        "description": "Prendi un richiamo di classe.",
        "image": "delinquenti",
        "rarity": "curse",
    },
    "Escursionista": {
        "description": "Dormi in montagna.",
        "image": "escursionista",
        "rarity": "rare",
    },
    "Gli inseparabili I": {
        "description": "Fidanzati.",
        "image": "gli_inseparabili_1",
        "rarity": "common",
    },
    "Gli inseparabili II": {
        "description": "Sposati.",
        "image": "gli_inseparabili_2",
        "rarity": "rare",
    },
    "L'inizio": {
        "description": "Tutti iniziano da qualche parte...",
        "image": "l_inizio",
        "rarity": "starter",
    },
    "Minecraft": {
        "description": "Uccidi il drago di Minecraft in modalità Sopravvivenza senza usare i trucchi.",
        "image": "minecraft",
        "rarity": "epic",
    },
    "Minecraft+": {
        "description": "Uccidi il drago di Minecraft in modalità Hardcore senza usare i trucchi.",
        "image": "minecraft_plus",
        "rarity": "legendary",
    },
    "Oof I": {
        "description": "Crea e pubblica un videogioco su Roblox Studio.",
        "image": "oof_1",
        "rarity": "common",
    },
    "Oof II": {
        "description": "Raggiungi 1000 visite totali in un tuo gioco di Roblox.",
        "image": "oof_2",
        "rarity": "rare",
    },
    "Oof III": {
        "description": "Raggiungi 100mila visite totali in un tuo gioco di Roblox.",
        "image": "oof_3",
        "rarity": "epic",
    },
    "Oof IV": {
        "description": "Raggiungi 10 milioni di visite totali in un tuo gioco di Roblox.",
        "image": "oof_4",
        "rarity": "legendary",
    },
    "Pets": {
        "description": "Prendi un animale domestico.",
        "image": "pets",
        "rarity": "common",
    },
    "Studente I": {
        "description": "Finisci le elementari.",
        "image": "studente_1",
        "rarity": "common",
    },
    "Studente II": {
        "description": "Finisci le medie.",
        "image": "studente_2",
        "rarity": "common",
    },
    "Studente III": {
        "description": "Finisci le superiori.",
        "image": "studente_3",
        "rarity": "common",
    },
    "The Developer I": {
        "description": "Crea un videogioco.",
        "image": "the_developer_1",
        "rarity": "common",
    },
    "The Developer II": {
        "description": "Pubblica il videogioco.",
        "image": "the_developer_2",
        "rarity": "rare",
    },
    
    "Esploratore": {
        "description": "Ottieni gli obiettivi \"Bagnante\" ed \"Escursionista\".",
        "image": "esploratore",
        "rarity": "special",
    },
    "Veterano": {
        "description": "Ottieni tutti gli obiettivi.",
        "image": "veterano",
        "rarity": "special",
    },
    
    "Sviluppatore": {
        "description": "Contribuisci nella realizzazione di Spark.",
        "image": "sviluppatore",
        "rarity": "unique",
    },
};
    
const people = {
    "Alexandru Cislari": [
    "Delinquente",
    "Delinquenti",
    "L'inizio",
    "Studente I",
    "Studente II",
    ],
    "Andrea Graziani": [
    "Bagnante",
    "Delinquente",
    "Delinquenti",
    "Escursionista",
    "Gli inseparabili I",
    "Gli inseparabili II",
    "L'inizio",
    "Pets",
    "Studente I",
    "Studente II",
    "Studente III",
    ],
    "Gabriele Graziani": [
    "Bagnante",
    "Debugger",
    "Delinquente",
    "Delinquenti",
    "Escursionista",
    "L'inizio",
    "Oof I",
    "Pets",
    "Studente I",
    "Studente II",
    "The Developer I",
    
    "Sviluppatore",
    ],
    "Maila Quaresima": [
    "Aristocratico I",
    "Bagnante",
    "Delinquenti",
    "Escursionista",
    "Gli inseparabili I",
    "Gli inseparabili II",
    "L'inizio",
    "Pets",
    "Studente I",
    "Studente II",
    "Studente III",
    ],
    "Raffaele Morgillo": [
    "Bagnante",
    "Delinquente",
    "Delinquenti",
    "L'inizio",
    "Oof I",
    "Oof II",
    "Studente I",
    "Studente II",
    ],
    "Sofia Graziani": [
    "Bagnante",
    "Delinquenti",
    "Escursionista",
    "Gli inseparabili I",
    "L'inizio",
    "Oof I",
    "Pets",
    ]
};