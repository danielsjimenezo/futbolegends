// https://www.jsdelivr.com/package/npm/convert-csv-to-json
// https://developers.google.com/sheets/api/guides/values
// https://developers.google.com/sheets/api/guides/concepts
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?gid=SHEET_ID#gid=SHEET_ID

// https://csvjson.com/csv2async
import createChart from "./createChart.js";
// https://www.w3schools.com/js/js_graphics_chartjs.asp
const playerTableBody = document.querySelector("#player-table-body");

async function fetchData() {
  const res = await fetch("./data.json");
  const data = await res.json();

  // create bar chart for goals
  // const chartGoals = createChart("goals", data, "Goals");

  // create bar chart for assists
  // const chartAssists = createChart("assists", data, "Assists");

  // // create bar chart for goal contributions
  // const chartGoalContributions = createChart(
  //   "goalContributions",
  //   data,
  //   "GoalContributions"
  // );

  // console.log(playerNamesByContributions, playerGoalContributions);
  // console.log(createTableRow(playersByGoals[0]));

  // playersByGoals.forEach((player) => {
  //   const html = createTableRow(player);
  //   playerTableBody.innerHTML += html;
  // });

  const playersByGoalsAndAssists = [...data].slice(0, 15).sort((a, b) => {
    return b.Goals + b.Assists - (a.Goals + a.Assists);
  });

  const playersByEfficiency = [...data].slice(0, 15).sort((a, b) => {
    return b.Efficiency - a.Efficiency;
  });

  const goalsAssistsChart = new Chart("contributions", {
    type: "bar",
    data: {
      labels: playersByGoalsAndAssists.map((p) => p.Player),
      datasets: [
        {
          backgroundColor: "#FF4F8B",
          data: playersByGoalsAndAssists.map((p) => p.Goals),
          // border-radius: 2px 4px 4px 5px;
          // border-top-left-radius: 4px;
          borderRadius: {
            topRight: 5,
            bottomRight: 5,
          },
          base: 1,
          label: "Goals",
        },
        {
          backgroundColor: "#AF95FC",
          data: playersByGoalsAndAssists.map((p) => p.Assists),
          borderRadius: 5,
          base: 1,
          label: "Assists",
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          stacked: true,
        },
        x: {
          stacked: true,
        },
      },
    },
  });

  const efficiencyChart = new Chart("efficiency", {
    type: "bar",
    data: {
      labels: playersByEfficiency.map((p) => p.Player),
      datasets: [
        {
          backgroundColor: "#FF4F8B",
          data: playersByEfficiency.map((p) => p.Efficiency),
          // border-radius: 2px 4px 4px 5px;
          // border-top-left-radius: 4px;
          borderRadius: {
            topRight: 5,
            bottomRight: 5,
          },
          base: 1,
          label: "Efficiency",
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  });
}

fetchData();

// Function to create table row
function createTableRow(player, i) {
  // images/Robert Lewandowsk.jpg

  const profilePicSrc = `./images/${player.Player}.jpg`;
  const flagSrc = `./images/flags/${player.birthCountry}.png`;

  return `
    <tr>
      <td>
        ${i + 1}.
      </td>
      <td>
        <div class="name-td">
          <img src="${profilePicSrc}" alt="Photo of ${
    player.Player
  }" class="picture" loading="lazy">
          ${player.Player}
        </div>
      </td>
      <td>
        ${player.Position}
      </td>
      <td>
        <div class="name-td">
          <img src="${flagSrc}" alt="Photo of ${
    player.birthCountry
  }" class="picture" loading="lazy">
          ${player.birthCountry}
      </td>
      <td>
        ${player.GamesPlayed}
      </td>
      <td>
        ${player.Goals}
      </td>
      <td>
        ${player.GamesPlayed}
      </td>
      <td>
        ${player.GoalContributions}
      </td>
      <td>
        ${player.Efficiency}
      </td>
    </tr>
  `;
}

// function to fetch data and populate table
async function fetchDataAndPopulateTable() {
  const res = await fetch("./data.json");
  const data = await res.json();

  const playerTableBody = document.querySelector("#table");

  data.forEach((player, i) => {
    const html = createTableRow(player, i);
    // playerTableBody.innerHTML += html;
    //  +=    is the same as     = itself +
    playerTableBody.insertAdjacentHTML("beforeend", html);
  });
}

// call the function to fetch data and populate the table
fetchDataAndPopulateTable();
