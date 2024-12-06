import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

interface Props {
  column: number;
  row: number;
}
const SkeletonTable = ({ column, row }: Props) => {
  const rows = Array(row).fill(null);
  const columns = Array(column).fill(null);
  return (
    <Table>
      <TableBody>
        {rows.map((row, key) => (
          <TableRow>
            {columns.map((col, key) => (
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
