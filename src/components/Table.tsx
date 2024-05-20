/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

type Column = {
  title: string;
  field: string;
  render?: (
    value: any,
    rowIndex: number,
    row: any,
    column: Column,
    columnIndex: number
  ) => JSX.Element | string;
  minWidth?: number;
};

type RowProps = {
  row: Record<string, any>;
  rowId?: string;
  columns: Column[];
  rowIndex: number;
  rowClass?: (row: Record<string, any>) => string;
};

const renderTable = (column: Column, row: Record<string, any>) => {
  const value = row[column.field];
  return value;
};

const TableColumns = ({ columns }: { columns: Column[] }) =>
  columns.map((c, i) => (
    <TableCell
      component='th'
      key={i}
      style={{ minWidth: c.minWidth ? c.minWidth : 0 }}
    >
      {c.title}
    </TableCell>
  ));

const renderCell = (
  j: number,
  row: Record<string, any>,
  c: Column,
  rowIndex: number
) => {
  if (c.render) {
    const val = c.render(row?.[c.field] ?? '', rowIndex, row, c, j);
    return val;
  }

  return renderTable(c, row);
};

const Row = ({ row, rowId, columns, rowIndex, rowClass }: RowProps) => {
  return (
    <TableRow
      key={rowId ? row[rowId] : rowIndex}
      className={rowClass ? rowClass(row) : ''}
    >
      {columns.map((c, j) => (
        <TableCell component='td' key={j}>
          {renderCell(j, row, c, rowIndex)}
        </TableCell>
      ))}
    </TableRow>
  );
};

type CustomTableProps = {
  columns: Column[];
  rows: Record<string, any>[];
  isCompact?: boolean;
  rowId?: string;
  rowClass?: (row: Record<string, any>) => string;
};

const CustomTable = ({
  columns,
  rows,
  isCompact = false,
  rowId,
  rowClass
}: CustomTableProps) => {
  if (!rows || !rows.length) {
    return null;
  }

  return (
    <TableContainer>
      <Table size={isCompact ? 'small' : undefined}>
        <TableHead>
          <TableRow>
            <TableColumns columns={columns} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row
              key={rowId ? row[rowId] : i}
              row={row}
              rowId={rowId}
              columns={columns}
              rowIndex={i}
              rowClass={rowClass}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
