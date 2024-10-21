const table = document.getElementById("ContentPlaceHolder1_GridView1");
const rows = Array.from(table.getElementsByTagName("tr"));
const playerRows = rows.filter((row) => {
  if (row.getElementsByTagName("td").length) {
    return row.getElementsByTagName("td")[1].textContent !== "PLAYER";
  }
  return row.getElementsByTagName("th").length === 0;
});
const formattedPlayerData = playerRows
  .map((playerRow) => {
    const data = playerRow.getElementsByTagName("td");
    if (data[0].getElementsByTagName("span").length) {
      const spans = Array.from(data[0].getElementsByTagName("span"));
      spans.forEach((span) => {
        span.parentNode.removeChild(span);
      });
    }
    return {
      Rank: Number(data[0].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      ADP: Number(data[1].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      Name: data[2].textContent.replaceAll(/(\r\n|\n|\r)/gm, "").trim(),
      "FG%":
        Math.round(
          Number(
            data[7].textContent.replaceAll(/(\r\n|\n|\r)/gm, "").split("(")[0]
          ) *
            100 *
            100
        ) / 100,
      "FT%":
        Math.round(
          Number(
            data[8].textContent.replaceAll(/(\r\n|\n|\r)/gm, "").split("(")[0]
          ) *
            100 *
            100
        ) / 100,
      "3PM": Number(data[9].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      PTS: Number(data[10].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      REB: Number(data[11].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      AST: Number(data[12].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      STL: Number(data[13].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      BLK: Number(data[14].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
      TO: Number(data[15].textContent.replaceAll(/(\r\n|\n|\r)/gm, "")),
    };
  })
  .filter(({ Name }) => Name !== "PLAYER");
