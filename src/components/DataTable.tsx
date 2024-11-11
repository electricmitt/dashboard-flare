import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Column {
  name: string;
  type: string;
  nullable: boolean;
}

const sampleData = [
  {
    name: "id",
    type: "uuid",
    nullable: false,
  },
  {
    name: "created_at",
    type: "timestamp",
    nullable: false,
  },
  {
    name: "title",
    type: "varchar",
    nullable: false,
  },
  {
    name: "content",
    type: "text",
    nullable: true,
  },
  {
    name: "author_id",
    type: "uuid",
    nullable: false,
  },
];

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState<Column[]>(sampleData);

  const filteredColumns = columns.filter((column) =>
    column.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search columns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nullable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColumns.map((column) => (
              <TableRow key={column.name}>
                <TableCell className="font-medium">{column.name}</TableCell>
                <TableCell>{column.type}</TableCell>
                <TableCell>{column.nullable ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;