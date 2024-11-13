import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pen, Trash } from "lucide-react";
import { toast } from "sonner";

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
  const handleDelete = (id: number, company: string) => {
    onDeleteClient(id);
    toast(`Deleted ${company}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Account Executive</TableHead>
          <TableHead className="w-[50px]">Actions</TableHead>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onEditClient(client);
                  }}>
                    <Pen className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(client.id, client.company);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}