let students = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      students = data;
      renderTable(students);
    });
});

function renderTable(data) {
  const tablesDiv = document.getElementById("tables");
  tablesDiv.innerHTML = `
        <table id="student-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Status</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

  const tbody = document.querySelector("#student-table tbody");
  tbody.innerHTML = "";

  data.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><div class="indexId"></div>${index + 1}</td>
            <td><div class="name-container"><img src="${
              student.img_src
            }" alt="Student Image"> ${student.first_name} ${
      student.last_name
    }</div></td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.email}</td>
        `;

    tbody.appendChild(row);
  });
}

function handleSearch() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const filteredData = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchTerm) ||
      student.last_name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData);
}

function sortByName(order) {
  const sortedData = [...students].sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;
    if (order === "asc") {
      return fullNameA.localeCompare(fullNameB);
    } else {
      return fullNameB.localeCompare(fullNameA);
    }
  });
  renderTable(sortedData);
}

function sortByMarks() {
  const sortedData = [...students].sort((a, b) => a.marks - b.marks);
  renderTable(sortedData);
}

function sortByPassing() {
  const filteredData = students.filter((student) => student.passing);
  renderTable(filteredData);
}

function sortByClass() {
  const sortedData = [...students].sort((a, b) => a.class - b.class);
  renderTable(sortedData);
}

function sortByGender() {
  const maleStudents = students.filter((student) => student.gender === "Male");
  const femaleStudents = students.filter(
    (student) => student.gender === "Female"
  );

  const tablesDiv = document.getElementById("tables");
  tablesDiv.innerHTML = "";

  const maleTable = document.createElement("table");
  maleTable.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
  renderTableToElement(maleStudents, maleTable.querySelector("tbody"));
  tablesDiv.appendChild(maleTable);

  const femaleTable = document.createElement("table");
  femaleTable.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
  renderTableToElement(femaleStudents, femaleTable.querySelector("tbody"));
  tablesDiv.appendChild(femaleTable);
}

function renderTableToElement(data, tbody) {
  tbody.innerHTML = "";

  data.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td><div class="indexId"></div>${index + 1}</td>
            <td><div class="name-container"><img src="${
              student.img_src
            }" alt="Student Image"> ${student.first_name} ${
      student.last_name
    }</div></td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.email}</td>
        `;

    tbody.appendChild(row);
  });
}
