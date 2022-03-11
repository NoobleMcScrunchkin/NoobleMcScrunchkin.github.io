// POPUP
let popup;

openPopup = () => {
    if (popup) {
        popup.close();
    }
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
        <body class="bg-green-500 min-h-screen text-center p-4 text-white select-none">
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

randomizeAgent = (player) => {
    let agentI = Math.floor(Math.random() * agents.length);
    let agentsTried = [];
    while (takenAgents.includes(agents[agentI]) || document.querySelector(`#${agents[agentI]}${player}`).checked == false) {
        agentI = Math.floor(Math.random() * agents.length);
        agentsTried.indexOf(agentI) === -1 ? agentsTried.push(agentI) : null;
        if (agentsTried.length == agents.length) return;
    }
    document.querySelector(`#playerIcon${player}`).src = `img/agents/${agents[agentI]}.webp`;
    document.querySelector(`#playerIcon${player}`).alt = agents[agentI];
    takenAgents[player - 1] = agents[agentI];
}

setPlayerAgent = (e, player, agentI) => {
    e.preventDefault();
    if (takenAgents.includes(agents[agentI])) return;
    document.querySelector(`#${agents[agentI]}${player}`).checked = true

    document.querySelector(`#playerIcon${player}`).src = `img/agents/${agents[agentI]}.webp`;
    document.querySelector(`#playerIcon${player}`).alt = agents[agentI];
    takenAgents[player - 1] = agents[agentI];
    document.getElementById(`agentsSelect${player}`).classList.add('hidden');
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
let defaultTasks = [
    {
        "desc": "Crab Walk: You must be crouching at all times and must only use left and right to move"
    },
    {
        "desc": "Glass Cannon: You must buy the most expensive weapon you can afford without any shields"
    },
    {
        "desc": "Simlish: All comms must be done in Simlish, or just made up language works too"
    },
    {
        "desc": "Quick Swap: You must have your knife out until you spot an enemy"
    },
    {
        "desc": "Spawn Tap: You must reach enemy spawn before being allowed to kill enemies"
    },
    {
        "desc": "Utility Overload: You must use all your utilties before next round or you dont get any next round"
    },
    {
        "desc": "Pick Two: Reroll the strat picker twice the first strat is for the whole round the 2nd strat is for post plant"
    },
    {
        "desc": "Formation: All players must follow the spike carrier in a line"
    },
    {
        "desc": "Trickshot: Must do a 360 before shooting any enemy"
    },
    {
        "desc": "Kill The President: Decide someone on the opposite team that person must die before killing anyone else"
    },
    {
        "desc": "Protect The President: Pick a player, give them the spike and hustle around them to plant"
    },
    {
        "desc": "Blinds here: Only players who can flash are allowed to use abilities and are only allowed to flash"
    },
    {
        "desc": "The One Gun: Pick a player, they buy a gun and that gun is the only gun allowed to shoot"
    },
    {
        "desc": "CSGO: No abilities or ults"
    },
    {
        "desc": "Gunswap: When you kill an enemy you must go get their weapon before killing anyone else"
    },
    {
        "desc": "Silent But Deadly: Set game master volume to 0"
    },
    {
        "desc": "Bend those knees: No standing up you must crouch"
    },
    {
        "desc": "Broken W Key: You must always be pressing W and no shift walking"
    },
    {
        "desc": "Shoutcasters: You must narrate what you are doing as if a sportcaster"
    },
    {
        "desc": "Fakeout: Use all abilities at one site then rotate to the other"
    },
    {
        "desc": "Evasive Maneuvers: You must jump around every corner you peek"
    },
    {
        "desc": "Sound Effects: You must make the noises for everything you do, pretend you are a kid"
    },
    {
        "desc": "Dog Tags: After killing you must go to the corpse of the enemy and spray it to be able to shoot"
    },
    {
        "desc": "Voices from Beyond: Only dead players may give comms, and only in a ghostly manner~"
    },
    {
        "desc": "Muscle Memory who dat?: Swap the keybinds for jump and shoot"
    },
    {
        "desc": "Shouty keys: Every key press you make must be said out loud"
    },
    {
        "desc": "Cheerleaders: After every kill all players must stop and cheer for 5 seconds"
    },
    {
        "desc": "One Clip: After using a clip you must drop the gun you can pick up other peoples guns"
    },
    {
        "desc": "Yes sir, Captain: Pick a player you must ask permission and recieve permission to swap weapons, reload or use abilties"
    },
    {
        "desc": "Poor man's Valorant: You can't spend more than the poorest player"
    },
    {
        "desc": "Inarticulate: You may only use the words \"Forwards\" \"Back\" \"Left\" and \"Right\""
    },
    {
        "desc": "Frenzy Mode: Frenzy only no abilities"
    },
    {
        "desc": "Flank Patrol: At least one person must reach the enemies spawn before planting",
        "restrictions": {
            "team": "attack"
        }
    },
    {
        "desc": "Everybody Dance: Relies on all players having spotify, start listening to Everybody Dance by Chic at the start of the round once they say \"Everybody Dance\" you must start dancing in game",
        "restrictions": {
            "team": "attack"
        }
    },
    {
        "desc": "Meat Shield: Once the spike is planted all players must stand on it ",
        "restrictions": {
            "team": "attack"
        }
    },
    {
        "desc": "No Time To Hide: Once the round starts you can't move until the spike has been planted",
        "restrictions": {
            "team": "defence"
        }
    },
    {
        "desc": "Time to retake: Wait in spawn until the spike is planted",
        "restrictions": {
            "team": "defence"
        }
    },
    {
        "desc": "One at a time: Only one can leave spawn at a time",
        "restrictions": {
            "team": "defence"
        }
    },
    {
        "desc": "Close and Personal: Shorty or Bucky only and must hold close angles in the bomb plant areas",
        "restrictions": {
            "team": "defence"
        }
    },
    {
        "desc": "The Power of Friendship: Choose a site, all buy odins and go to that site, stand in a line and no moving unless the team goes to the other site",
        "restrictions": {
            "team": "defence"
        }
    }
];

getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON('defaultTasks.json', (error, res) => {
    if (error) {
        console.error(error);
        return;
    }

    defaultTasks = res;
});

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

    if (tasks.length == 0) return;

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
            if (!document.querySelector('#genericTasksInp').checked) {
                valid = false;
                continue;
            }
            break;
        }

        if (task.restrictions.map != undefined) {
            if (!task.restrictions.map.includes(maps[mapSiema.currentSlide]) || !document.querySelector('#mapTasksInp').checked) {
                valid = false;
                continue;
            }
        }

        if (task.restrictions.agent != undefined) {
            if (!document.querySelector('#agentTasksInp').checked) {
                valid = false;
                continue;
            }

            let commonAgents = task.restrictions.agent.filter(function (e) {
                return takenAgents.indexOf(e) > -1;
            });
            if (commonAgents.length == 0) {
                valid = false;
                continue;
            }
        }

        if (task.restrictions.team != undefined) {
            if (team != task.restrictions.team || !document.querySelector('#teamTasksInp').checked) {
                valid = false;
                continue;
            }
        }
    }

    taskArea.textContent = task.desc;
    updatePopup();
}

// PRELOAD
function preloadImage(url) {
    var img = new Image();
    img.src = url;
}

maps.forEach(map => {
    preloadImage(`img/maps/${map}.webp`)
});

agents.forEach(agent => {
    preloadImage(`img/agents/${agent}.webp`)
});