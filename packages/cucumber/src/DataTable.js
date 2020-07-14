export default class DataTable {
  constructor(table) {
    this.rawTable = table.rows.map((row) =>
      row.cells.map((cell) => cell.value)
    );
  }

  raw() {
    return this.rawTable.slice(0);
  }

  rowsHash() {
    const rows = this.raw();
    return rows.reduce((hash, row) => {
      if (row.length !== 2) {
        throw new Error(
          'rowsHash can only be called on a data table where all rows have exactly two columns'
        );
      }
      const [key, value] = row;
      hash[key] = value;
      return hash;
    }, {});
  }
}
