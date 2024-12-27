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
        matchDate,
        responses: []  // Neu: Antworten speichern
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
                <h3>${request.teamName} (${request.ageGroup} - ${request.skillLevel})</h3>
                <p>Datum: ${request.matchDate}</p>

                <!-- Antworten anzeigen -->
                <div class="responses">
                    ${request.responses.map(response => `<p><strong>${response}</strong></p>`).join("")}
                </div>

                <!-- Antwortformular -->
                <form onsubmit="respondToRequest(event, ${index})">
                    <input type="text" placeholder="Dein Teamname" required id="response-${index}">
                    <button type="submit">Antworten</button>
                </form>
            </div>
        `;
    });
}

// Antwort speichern und anzeigen
function respondToRequest(event, index) {
    event.preventDefault();
    const responseField = document.getElementById(`response-${index}`);
    const responseText = responseField.value;

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests[index].responses.push(responseText);
    localStorage.setItem("requests", JSON.stringify(requests));

    responseField.value = "";  // Eingabefeld leeren
    displayRequests();
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

// Filter-Ergebnis anzeigen
function displayFiltered(filteredRequests) {
    const list = document.getElementById("requestList");
    list.innerHTML = "";

    filteredRequests.forEach((request, index) => {
        list.innerHTML += `
            <div class="request-item">
                <h3>${request.teamName} (${request.ageGroup} - ${request.skillLevel})</h3>
                <p>Datum: ${request.matchDate}</p>
            </div>
        `;
    });
}

// Beim Start Anfragen laden
displayRequests();
