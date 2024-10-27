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
  const chartGoals = createChart("goals", data, "Goals");

  // create bar chart for assists
  const chartAssists = createChart("assists", data, "Assists");

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
}

fetchData();

// Function to create table row
// function createTableRow(player) {
//   return `
//     <tr>
//       <td>
//         ${player.Player}
//       </td>
//       <td>
//         ${player.Position}
//       </td>
//       <td>
//         ${player.birthCountry}
//       </td>
//       <td>
//         ${player.Goals}
//       </td>
//       <td>
//         ${player.GamesPlayed}
//       </td>
//       <td>
//         ${player.GoalContributions}
//       </td>
//       <td>
//         ${player.Efficiency}
//       </td>
//     </tr>
//   `;
// }
