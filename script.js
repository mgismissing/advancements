document.getElementById('search-button').addEventListener('click', function() {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        window.location.href = `?u=${encodeURIComponent(searchTerm)}`;
    } else {
        window.location.href = `?u=`;
    }
});

function getParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    const people = {
        "Andrea Graziani": [
            "Delinquente",
            "Delinquenti",
            "Gli inseparabili I",
            "Gli inseparabili II",
            "L'inizio",
            "Studente I",
            "Studente II",
            "Studente III",
        ],
        "Gabriele Graziani": [
            "Delinquente",
            "Delinquenti",
            "L'inizio",
            "Studente I",
            "Studente II",
            "The Developer I",
        ],
        "Sofia Graziani": [
            "Delinquenti",
            "Gli inseparabili I",
            "L'inizio",
        ]
    };
    const goals = {
        "Debugger": {
            "description": "Trova un bug in questo sito e segnalalo.",
            "image": "debugger",
        },
        "Delinquente": {
            "description": "Prendi un richiamo individuale.",
            "image": "delinquente",
        },
        "Delinquenti": {
            "description": "Prendi un richiamo di classe.",
            "image": "delinquenti",
        },
        "Gli inseparabili I": {
            "description": "Fidanzati.",
            "image": "gli_inseparabili_1",
        },
        "Gli inseparabili II": {
            "description": "Sposati.",
            "image": "gli_inseparabili_2",
        },
        "L'inizio": {
            "description": "Tutti iniziano da qualche parte...",
            "image": "l_inizio",
        },
        "Minecraft": {
            "description": "Uccidi il drago di Minecraft in modalità Sopravvivenza senza usare i trucchi.",
            "image": "minecraft",
        },
        "Minecraft+": {
            "description": "Uccidi il drago di Minecraft in modalità Hardcore senza usare i trucchi.",
            "image": "minecraft_plus",
        },
        "Studente I": {
            "description": "Finisci le elementari.",
            "image": "studente_1",
        },
        "Studente II": {
            "description": "Finisci le medie.",
            "image": "studente_2",
        },
        "Studente III": {
            "description": "Finisci le superiori.",
            "image": "studente_3",
        },
        "The Developer I": {
            "description": "Crea un videogioco.",
            "image": "the_developer_1",
        },
        "The Developer II": {
            "description": "Pubblica il videogioco.",
            "image": "the_developer_2",
        }
    };

    const goalsContainer = document.getElementById("goals-container");
    
    if (getParam("u") in people) {
        document.getElementById("title").innerHTML = `Obiettivi:<br>${getParam("u")}`;
        for (let i = 0; i < people[getParam("u")].length; i++) {
            const goal = people[getParam("u")][i]
            const goalDiv = document.createElement("div");
            goalDiv.classList.add("goal");

            const goalImage = document.createElement("img");
            goalImage.src = `img/${goals[goal].image}.png`;
            goalDiv.appendChild(goalImage);

            const goalTitle = document.createElement("h2");
            goalTitle.textContent = goal;
            goalDiv.appendChild(goalTitle);

            const goalDescription = document.createElement("p");
            goalDescription.textContent = goals[goal].description;
            goalDiv.appendChild(goalDescription);

            goalsContainer.appendChild(goalDiv);
        }
    } else if (!getParam("u") in people) {
        const goalDiv = document.createElement("div");
        goalDiv.innerHTML = "<p>Questa persona non si è ancora registrata.<p>"
    } else {
        for (const goal in goals) {
            const goalDiv = document.createElement("div");
            goalDiv.classList.add("goal");

            const goalImage = document.createElement("img");
            goalImage.src = `img/${goals[goal].image}.png`;
            goalDiv.appendChild(goalImage);

            const goalTitle = document.createElement("h2");
            goalTitle.textContent = goal;
            goalDiv.appendChild(goalTitle);

            const goalDescription = document.createElement("p");
            goalDescription.textContent = goals[goal].description;
            goalDiv.appendChild(goalDescription);

            goalsContainer.appendChild(goalDiv);
        }
    }
});
