// POPUP
let popup;

openPopup = () => {
    popup = window.open("", "", "height=250,width=600,status=no,toolbar=no,menubar=no,location=no");
    popup.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="css/styles.css">
            <title>Valorant - Strat Roulette</title>
        </head>
        <body class="bg-green-500 min-h-screen text-center p-4 text-white">
            <div class="w-full mx-auto">
                <div class="justify-between">
                    <img id="playerIcon1" class="h-24 aspect-square inline" src="https://via.placeholder.com/128" alt="Agent">
                    <img id="playerIcon2" class="h-24 aspect-square inline" src="https://via.placeholder.com/128" alt="Agent">
                    <img id="playerIcon3" class="h-24 aspect-square inline" src="https://via.placeholder.com/128" alt="Agent">
                    <img id="playerIcon4" class="h-24 aspect-square inline" src="https://via.placeholder.com/128" alt="Agent">
                    <img id="playerIcon5" class="h-24 aspect-square inline" src="https://via.placeholder.com/128" alt="Agent">
                </div>
                <div id="taskArea" class="mt-2 text-2xl font-valorant">
                    Please select a team.
                </div>
            </div>
        </body>
    `);
    popup.document.close();
    popup.window.onload = () => {
        updatePopup();
    }
}

updatePopup = () => {
    if (!popup) return;
    if (!popup.document) return;
    for (let i = 1; i <= 5; i++) {
        popup.document.querySelector(`#playerIcon${i}`).src = document.querySelector(`#playerIcon${i}`).src;
        popup.document.querySelector(`#playerIcon${i}`).alt = document.querySelector(`#playerIcon${i}`).alt;
        popup.document.querySelector(`#taskArea`).textContent = document.querySelector(`#taskArea`).textContent;
    }
}

// SETTIGNS
handleFileSelect = (event) => {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    try {
        reader.readAsText(event.target.files[0])
    } catch (e) {
        console.error(e.message);
    }
}

handleFileLoad = (event) => {
    try {
        customTasks = JSON.parse(event.target.result)
        if (customTasks.length != 0) {
            customTasksAllowed = true;
            customTasksInp.checked = true;
            customTasksInp.disabled = false;
            defaultTasksInp.disabled = false;
        } else {
            customTasksAllowed = false;
            customTasksInp.checked = false;
            customTasksInp.disabled = true;
            customTasks = [];
        }
    } catch (e) {
        console.error(e.message);
        customTasksAllowed = false;
        customTasks = [];
        return;
    }
}

removeCustomTasks = () => {
    customTasksAllowed = false;
}

// AGENTS
const agents = [
    'astra',
    'breach',
    'brimstone',
    'chamber',
    'cypher',
    'jett',
    'kayo',
    'killjoy',
    'neon',
    'omen',
    'phoenix',
    'raze',
    'reyna',
    'sage',
    'skye',
    'sova',
    'viper',
    'yoru',
];

let takenAgents = [];

randomizeAgents = () => {
    takenAgents = [];
    agentLoop:
    for (let i = 1; i <= 5; i++) {
        let agentI = Math.floor(Math.random() * agents.length);
        let agentsTried = [];
        while (takenAgents.includes(agents[agentI]) || document.querySelector(`#${agents[agentI]}${i}`).checked == false) {
            agentI = Math.floor(Math.random() * agents.length);
            agentsTried.indexOf(agentI) === -1 ? agentsTried.push(agentI) : null;
            if (agentsTried.length == agents.length) continue agentLoop;
        }
        document.querySelector(`#playerIcon${i}`).src = `img/agents/${agents[agentI]}.webp`;
        document.querySelector(`#playerIcon${i}`).alt = agents[agentI];
        takenAgents.push(agents[agentI]);
    }
    updatePopup();
}

// MAPS
const maps = [
    'ascent',
    'bind',
    'breeze',
    'fracture',
    'haven',
    'icebox',
    'split',
]

// TASKS.
const defaultTasks = [
    {
        desc: 'This is a task that the players have to do. #1',
        // restrictions: {
        //     map: ['ascent', 'split'],
        //     agent: ['reyna', 'sage'],
        //     team: 'attack',
        // },
    },
    {
        desc: 'This is a task that the players have to do. #2',
        // restrictions: {
        //     map: ['ascent', 'split'],
        //     agent: ['reyna', 'sage'],
        //     team: 'attack',
        // },
    },
    {
        desc: 'This is a task that the players have to do. #3',
        // restrictions: {
        //     map: ['ascent', 'split'],
        //     agent: ['reyna', 'sage'],
        //     team: 'attack',
        // },
    },
    {
        desc: 'This is a task that the players have to do. #4',
        // restrictions: {
        //     map: ['ascent', 'split'],
        //     agent: ['reyna', 'sage'],
        //     team: 'attack',
        // },
    },
];

randomizeTask = () => {
    if (team == undefined) return;

    let taskArea = document.querySelector('#taskArea');

    let tasks;
    if (customTasksAllowed) {
        tasks = customTasks;
        if (defaultTasksAllowed) {
            tasks = tasks.concat(defaultTasks);
        }
    } else {
        tasks = defaultTasks;
    }

    let attemptedTasks = [];
    valid = false;
    let task;
    while (!valid) {
        valid = true;

        if (attemptedTasks.length == tasks.length) {
            taskArea.textContent = 'No tasks fit the criteria';
            return;
        }

        let taskI = Math.floor(Math.random() * tasks.length);
        while (attemptedTasks.includes(taskI)) {
            taskI = Math.floor(Math.random() * tasks.length);
        }
        attemptedTasks.push(taskI);
        task = tasks[taskI];

        if (task.restrictions == undefined) {
            break;
        }

        if (task.restrictions.map != undefined && !task.restrictions.map.includes(maps[mapSiema.currentSlide])) {
            valid = false;
            continue;
        }

        if (task.restrictions.agent != undefined) {
            let commonAgents = task.restrictions.agent.filter(function (e) {
                return takenAgents.indexOf(e) > -1;
            });
            if (commonAgents.length == 0) {
                valid = false;
                continue;
            }
        }

        if (task.restrictions.team != undefined && team != task.restrictions.team) {
            valid = false;
            continue;
        }
    }

    taskArea.textContent = task.desc;
    updatePopup();
}