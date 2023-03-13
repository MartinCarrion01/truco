import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs";
import { Table } from "../services/tableService";

let currentTable: Table | undefined;

const tableSubject = new Subject<Table | undefined>();

export function useCurrentTable() {
  const [table, setTable] = useState(currentTable);

  useLayoutEffect(() => {
    tableSubject.subscribe((newState) => {
      setTable(newState);
    });
  }, []);

  return table;
}

export function setCurrentTable(table: Table) {
  currentTable = table;
  tableSubject.next(currentTable);
}
