import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Client {
  id: number;
  company: string;
  product: string;
  status: string;
  channel: string;
  accountExec: string;
}

interface ClientTableProps {
  clients: Client[];
  onDeleteClient: (id: number) => void;
  onEditClient: (client: Client) => void;
}

export function ClientTable({ clients, onDeleteClient, onEditClient }: ClientTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Account Executive</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow 
            key={client.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onEditClient(client)}
          >
            <TableCell>{client.company}</TableCell>
            <TableCell>{client.product}</TableCell>
            <TableCell>{client.status}</TableCell>
            <TableCell>{client.channel}</TableCell>
            <TableCell>{client.accountExec}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClient(client.id);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}