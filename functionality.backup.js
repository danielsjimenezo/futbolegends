// https://www.jsdelivr.com/package/npm/convert-csv-to-json
// https://developers.google.com/sheets/api/guides/values
// https://developers.google.com/sheets/api/guides/concepts
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?gid=SHEET_ID#gid=SHEET_ID

// https://csvjson.com/csv2async

// https://www.w3schools.com/js/js_graphics_chartjs.asp
const playerTableBody = document.querySelector("#player-table-body");

async function fetchData() {
  const res = await fetch("./data.json");
  const data = await res.json();

  const playersByGoals = [...data].filter((p) => p.Goals > 0);
  const playersByAssists = [...data].filter((p) => p.Assists > 0);
  const playersByContributions = [...data].filter(
    (p) => p.GoalContributions > 0
  );

  // sort players by goal amt
  playersByGoals.sort((a, b) => b.Goals - a.Goals);

  // sort players by assist count
  playersByAssists.sort((c, d) => d.Assists - c.Assists);

  //sort players by goal contributions
  playersByContributions.sort(
    (e, f) => f.GoalContributions - e.GoalContributions
  );

  //   Let's lessons on callback functions and  higher order array methods

  // get array of all the names
  const playerNamesByGoals = playersByGoals.map((p) => p.Player);
  const playerNamesByAssists = playersByAssists.map((p) => p.Player);
  const playerNamesByContributions = playersByContributions.map(
    (p) => p.Player
  );

  // get array of all goals
  const playerGoals = playersByGoals.map((p) => p.Goals);

  // get array of all assists
  const playerAssists = playersByAssists.map((p) => p.Assists);

  // get array of all goal contributions
  const playerGoalContributions = playersByContributions.map(
    (p) => p.GoalContributions
  );

  // defines bar colors
  const barColors = ["red", "blue", "#ff00ff", "rgb(120, 0, 200)"];

  // create bar chart for goals
  const chartGoals = new Chart("goals", {
    type: "bar",
    data: {
      labels: playerNamesByGoals,
      datasets: [
        {
          backgroundColor: barColors,
          data: playerGoals,
          borderRadius: 5,
          base: 1,
          label: "Top Goalscorers",
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
  });

  // create bar chart for assists
  const chartAssists = new Chart("assists", {
    type: "bar",
    data: {
      labels: playerNamesByAssists,
      datasets: [
        {
          backgroundColor: barColors,
          data: playerAssists,
          borderRadius: 5,
          base: 1,
          label: "Top Assisters",
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
  });

  // create bar chart for goal contributions
  const chartGoalContributions = new Chart("goalContributions", {
    type: "bar",
    data: {
      labels: playerNamesByContributions,
      datasets: [
        {
          backgroundColor: barColors,
          data: playerGoalContributions,
          borderRadius: 5,
          base: 1,
          label: "Top Goal Contributors",
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
  });

  // console.log(playerNamesByContributions, playerGoalContributions);
  // console.log(createTableRow(playersByGoals[0]));

  playersByGoals.forEach((player) => {
    const html = createTableRow(player);
    playerTableBody.innerHTML += html;
  });
}

fetchData();

// Function to create table row
function createTableRow(player) {
  return `
    <tr>
      <td>
        ${player.Player}
      </td>
      <td>
        ${player.Position}
      </td>
      <td>
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

  data.forEach((player) => {
    const html = createTableRow(player);
    playerTableBody.innerHTML += html;
  });
}

// call the function to fetch data and populate the table
fetchDataAndPopulateTable();
