(function() {
  let first_player = true;

  function mapBoard() {
    return [].slice.call(document.getElementsByTagName("tr")).map(row => {
      return [].slice.call(row.getElementsByTagName("td")).map(col => col.innerHTML);
    });
  }

  function checkLines(board) {
    return board.some(line => line.every(item => item && item === line[0]) );
  }

  function verifyGame() {
    const board = mapBoard();
    const board_rotated = board[0].map((item, i) => board.map(row => row[i]).reverse());
    const board_cross = [board.map((item, i) => item[i]), board_rotated.map((item, i) => item[i])];
    return checkLines(board) || checkLines(board_rotated) || checkLines(board_cross);
  }

  function handleClick() {
    if (!this.innerHTML && !verifyGame()) {
      this.innerHTML = first_player ? "☕" : "☘️";
      first_player = !first_player;
    }

    if (verifyGame()) {
      document.querySelector("h2").innerHTML = "Winner: " + this.innerHTML;
    }
  }

  document.querySelectorAll('td').forEach(cell => {
    cell.onclick = handleClick;
  });
})();
