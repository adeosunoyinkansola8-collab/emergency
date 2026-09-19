const emergencyForm = document.getElementById("emergencyForm");

emergencyForm.addEventListener("submit", function(event) {

    
    event.preventDefault();

    
    const name = document.getElementById("name").value;
    const emergencyType = document.getElementById("emergencyType").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    
    const reportId =
        "ER-" + Math.floor(100000 + Math.random() * 900000);

    
    const report = {
        id: reportId,
        name: name,
        emergencyType: emergencyType,
        location: location,
        description: description,
        status: "Pending"
    };

    let reports =
        JSON.parse(localStorage.getItem("emergencyReports")) || [];

    
    reports.push(report);

    
    localStorage.setItem(
        "emergencyReports",
        JSON.stringify(reports)
    );

    alert(
        "Emergency report submitted successfully!\n\n" +
        "Your Report ID is: " + reportId
    );

    
    emergencyForm.reset();

});


function trackReport() {

    const reportId =
        document.getElementById("reportId").value.trim();

    const result =
        document.getElementById("trackResult");

    // Get saved reports
    const reports =
        JSON.parse(localStorage.getItem("emergencyReports")) || [];

    // Find the report
    const report = reports.find(function(item) {
        return item.id.toLowerCase() === reportId.toLowerCase();
    });

    // If report doesn't exist
    if (!report) {

        result.innerHTML = `
            <p class="error-message">
                ❌ Report not found. Please check your Report ID.
            </p>
        `;

        return;
    }

    // Display report
    result.innerHTML = `
        <div class="report-result">

            <h3>Emergency Report Found ✅</h3>

            <p>
                <strong>Report ID:</strong>
                ${report.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${report.name}
            </p>

            <p>
                <strong>Emergency:</strong>
                ${report.emergencyType}
            </p>

            <p>
                <strong>Location:</strong>
                ${report.location}
            </p>

            <p>
                <strong>Description:</strong>
                ${report.description}
            </p>

            <p class="status">
                Status: ${report.status}
            </p>

        </div>
    `;
}

function loadAdminDashboard() {

    const reports =
        JSON.parse(localStorage.getItem("emergencyReports")) || [];

    const reportsList =
        document.getElementById("reportsList");

    let pending = 0;
    let progress = 0;
    let resolved = 0;


    reports.forEach(function(report) {

        if (report.status === "Pending") {
            pending++;
        }

        if (report.status === "In Progress") {
            progress++;
        }

        if (report.status === "Resolved") {
            resolved++;
        }

    });


    document.getElementById("totalReports").textContent =
        reports.length;

    document.getElementById("pendingReports").textContent =
        pending;

    document.getElementById("progressReports").textContent =
        progress;

    document.getElementById("resolvedReports").textContent =
        resolved;


    if (reports.length === 0) {

        reportsList.innerHTML =
            "<p>No emergency reports yet.</p>";

        return;
    }


    reportsList.innerHTML = "";


    reports.forEach(function(report, index) {

        const reportDiv = document.createElement("div");

        reportDiv.className = "admin-report";

        reportDiv.innerHTML = `

            <h3>🚨 ${report.emergencyType}</h3>

            <p>
                <strong>Report ID:</strong>
                ${report.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${report.name}
            </p>

            <p>
                <strong>Location:</strong>
                ${report.location}
            </p>

            <p>
                <strong>Description:</strong>
                ${report.description}
            </p>

            <label>
                <strong>Status:</strong>
            </label>

            <select
                class="status-select"
                onchange="updateStatus(${index}, this.value)"
            >

                <option value="Pending"
                    ${report.status === "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="In Progress"
                    ${report.status === "In Progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="Resolved"
                    ${report.status === "Resolved" ? "selected" : ""}>
                    Resolved
                </option>

            </select>

        `;

        reportsList.appendChild(reportDiv);

    });
}

function updateStatus(index, newStatus) {

    let reports =
        JSON.parse(localStorage.getItem("emergencyReports")) || [];

    reports[index].status = newStatus;

    localStorage.setItem(
        "emergencyReports",
        JSON.stringify(reports)
    );

    loadAdminDashboard();

    alert("Report status updated successfully!");
}

if (document.getElementById("reportsList")) {
    loadAdminDashboard();
}