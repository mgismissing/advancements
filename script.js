document.getElementById('search-button').addEventListener('click', function() {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        window.location.href = `?u=${encodeURIComponent(searchTerm)}`;
    } else {
        window.location.href = `?u=${encodeURIComponent("*all")}`;
    }
});

function getParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    if (getParam("u") == null || getParam("u") == "") {
        window.location.href = `?u=${encodeURIComponent("*all")}`;
    }
    
    all_goals = []
    for (const goal in goals) {
        if (goals[goal].rarity !== "special") {
            all_goals += goal
        }
    }
    
    if (getParam("u") in people) {
        document.getElementById("title").innerHTML = `Obiettivi:<br>${getParam("u")}`;
        for (let i = 0; i < people[getParam("u")].length; i++) {
            const goal = people[getParam("u")][i]
            addGoal(goal)
        }
        if (people[getParam("u")] == all_goals) {
            addSection("Obiettivi speciali", "Qui ci sono degli obiettivi speciali che vengono aggiunti automaticamente.")
            addGoal("Veterano")
        }
    } else if (!(getParam("u") in people) && !(getParam("u") == "*all")) {
        document.getElementById("title").innerHTML = `Obiettivi:<br>${getParam("u")}`;
        const goalsContainer = document.getElementById("goals-container");
        const goalDiv = document.createElement("div");
        goalDiv.innerHTML = "<p>Questa persona non si è ancora registrata.<p>";
        goalsContainer.appendChild(goalDiv);
    } else {
        document.getElementById("title").innerHTML = `Tutti gli obiettivi`;
        for (const goal in goals) {
            addGoal(goal)
        }
    }
});

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
function addSection(name, desc) {
    const goalsContainer = document.getElementById("goals-container");
    
    const goalDiv = document.createElement("div");
    goalDiv.classList.add("goal");

    const goalTitle = document.createElement("h2");
    goalTitle.textContent = name;
    goalDiv.appendChild(goalTitle);
    
    const goalDescription = document.createElement("p");
    goalDescription.textContent = desc;
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
    
    "Veterano": {
        "description": "Ottieni tutti gli obiettivi.",
        "image": "veterano",
        "rarity": "special",
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
    "Delinquente",
    "Delinquenti",
    "Gli inseparabili I",
    "Gli inseparabili II",
    "L'inizio",
    "Pets",
    "Studente I",
    "Studente II",
    "Studente III",
    ],
    "Gabriele Graziani": [
    "Debugger",
    "Delinquente",
    "Delinquenti",
    "L'inizio",
    "Oof I",
    "Pets",
    "Studente I",
    "Studente II",
    "The Developer I",
    ],
    "Raffaele Morgillo": [
    "Delinquente",
    "Delinquenti",
    "L'inizio",
    "Oof I",
    "Oof II",
    "Studente I",
    "Studente II",
    ],
    "Sofia Graziani": [
    "Delinquenti",
    "Gli inseparabili I",
    "L'inizio",
    "Oof I",
    "Pets",
    ]
};

let all_goals = []