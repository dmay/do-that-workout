const setSelectButtons = document.querySelectorAll('.set-select button');

setSelectButtons.forEach(button => {
    button.addEventListener('click', () => {
        setSelectButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

async function fetchExercises() {
    const response = await fetch('exercises.json');
    const exercises = await response.json();
    return exercises;
}

function getRandomExercise(exercises, gripType) {
    const filteredExercises = exercises.filter(exercise => exercise.gripType === gripType || !exercise.gripType);
    const index = Math.floor(Math.random() * filteredExercises.length);
    return filteredExercises[index];
}

function generateSets(setsNumber, exercises) {
    const sets = [];
    let currentGripType = '';
    for (let i = 0; i < setsNumber; i++) {
        const gripType = currentGripType === 'pronated' ? 'supinated' : 'pronated';
        const legExercise = getRandomExercise(exercises.Legs);
        const pushExercise = getRandomExercise(exercises.Push, gripType);
        const pullExercise = getRandomExercise(exercises.Pull, gripType);
        sets.push([legExercise, pullExercise, pushExercise]);
        currentGripType = gripType;
    }
    return sets;
}

function displaySets(sets) {
    const container = document.getElementById('workoutContainer');
    container.innerHTML = '';
    sets.forEach(set => {
        const setDiv = document.createElement('div');
        setDiv.className = 'set';
        set.forEach(exercise => {
            const img = document.createElement('img');
            img.src = exercise.url;
            img.alt = exercise.name;
            setDiv.appendChild(img);
        });
        container.appendChild(setDiv);
    });
}

document.getElementById('generate').addEventListener('click', async () => {
    const setsNumber = parseInt(document.querySelector('.set-select .selected').dataset.value);
    const exercises = await fetchExercises();
    const sets = generateSets(setsNumber, exercises);
    displaySets(sets);
});
