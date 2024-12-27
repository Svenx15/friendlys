document.getElementById("requestForm").onsubmit = function(e) {
    e.preventDefault();
    const teamName = document.getElementById("teamName").value;
    const ageGroup = document.getElementById("newAgeGroup").value;
    const skillLevel = document.getElementById("newSkillLevel").value;
    const matchDate = document.getElementById("matchDate").value;

    const newRequest = {
        teamName,
        ageGroup,
        skillLevel,
        matchDate
    };

    // Anfrage speichern (lokal)
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests();
    document.getElementById("requestForm").reset();
};

// Anfragen anzeigen
function displayRequests() {
    const list = document.getElementById("requestList");
    list.innerHTML = "";

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    
    requests.forEach((request, index) => {
        list.innerHTML += `
            <div class="request-item">
                <h3>${request.teamName} ( ${request.ageGroup} - ${request.skillLevel} )</h3>
                <p>Datum: ${request.matchDate}</p>
                <button onclick="respondToRequest(${index})">Antworten</button>
            </div>
        `;
    });
}

// Filterfunktion
function filterRequests() {
    const ageFilter = document.getElementById("ageGroup").value;
    const skillFilter = document.getElementById("skillLevel").value;
    const dateFilter = document.getElementById("dateFilter").value;

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const filtered = requests.filter(request => 
        (ageFilter ? request.ageGroup === ageFilter : true) &&
        (skillFilter ? request.skillLevel === skillFilter : true) &&
        (dateFilter ? request.matchDate === dateFilter : true)
    );

    displayFiltered(filtered);
}

function displayFiltered(filteredRequests) {
    const list = document.getElementById("requestList");
    list.innerHTML = "";

    filteredRequests.forEach(request => {
        list.innerHTML += `
            <div class="request-item">
                <h3>${request.teamName} ( ${request.ageGroup} - ${request.skillLevel} )</h3>
                <p>Datum: ${request.matchDate}</p>
            </div>
        `;
    });
}

// Beim Start Anfragen laden
displayRequests();
