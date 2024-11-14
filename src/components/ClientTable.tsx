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
import { Info, Pen, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Client {
  id: number;
  company: string;
  product: string;
  status: string;
  channel: string;
  accountExec: string;
  startDate?: string;
  endDate?: string;
  dealAmount?: number;
  monthlyVolume?: number;
}

interface ClientTableProps {
  clients: Client[];
  onDeleteClient: (id: number) => void;
  onEditClient: (client: Client) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-success/20 ring-success';
    case 'inactive':
      return 'bg-destructive/20 ring-destructive';
    case 'pending':
      return 'bg-yellow-500/20 ring-yellow-500';
    default:
      return 'bg-gray-300/20 ring-gray-300';
  }
};

export function ClientTable({ clients, onDeleteClient, onEditClient }: ClientTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof Client) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const handleDelete = (id: number, company: string) => {
    onDeleteClient(id);
    toast(`Deleted ${company}`);
  };

  const sortedClients = useMemo(() => {
    let result = [...clients];

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [clients, sortConfig]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort('company')} className="cursor-pointer">
            Company
          </TableHead>
          <TableHead onClick={() => handleSort('product')} className="cursor-pointer">
            Product
          </TableHead>
          <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
            Status
          </TableHead>
          <TableHead onClick={() => handleSort('channel')} className="cursor-pointer">
            Channel
          </TableHead>
          <TableHead onClick={() => handleSort('accountExec')} className="cursor-pointer">
            Account Executive
          </TableHead>
          <TableHead className="w-[50px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedClients.map((client) => (
          <TableRow 
            key={client.id} 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onEditClient(client)}
          >
            <TableCell>{client.company}</TableCell>
            <TableCell>{client.product}</TableCell>
            <TableCell className="flex items-center gap-2">
              <span className={`inline-flex items-center justify-center w-20 px-2 py-1 rounded-full ring-2 ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {client.startDate && client.endDate ? (
                      <>
                        <p>Start: {client.startDate}</p>
                        <p>End: {client.endDate}</p>
                      </>
                    ) : (
                      <p>No contract dates available</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
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