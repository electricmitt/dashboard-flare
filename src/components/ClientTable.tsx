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
import { ArrowUpDown, Pen, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { ClientFilters } from "./ClientFilters";

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
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  
  const [filters, setFilters] = useState({
    product: 'all',
    status: 'all',
    accountExec: 'all'
  });

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

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const uniqueProducts = useMemo(() => [...new Set(clients.map(client => client.product))], [clients]);
  const uniqueStatuses = useMemo(() => [...new Set(clients.map(client => client.status))], [clients]);
  const uniqueExecs = useMemo(() => [...new Set(clients.map(client => client.accountExec))], [clients]);

  const filteredAndSortedClients = useMemo(() => {
    let result = [...clients];

    // Apply filters
    if (filters.product !== 'all') {
      result = result.filter(client => client.product === filters.product);
    }
    if (filters.status !== 'all') {
      result = result.filter(client => client.status === filters.status);
    }
    if (filters.accountExec !== 'all') {
      result = result.filter(client => client.accountExec === filters.accountExec);
    }

    // Apply sorting
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
  }, [clients, sortConfig, filters]);

  return (
    <div className="space-y-4">
      <ClientFilters
        filters={filters}
        uniqueProducts={uniqueProducts}
        uniqueStatuses={uniqueStatuses}
        uniqueExecs={uniqueExecs}
        onFilterChange={handleFilterChange}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('company')} className="cursor-pointer">
              Company <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('product')} className="cursor-pointer">
              Product <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
              Status <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('channel')} className="cursor-pointer">
              Channel <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort('accountExec')} className="cursor-pointer">
              Account Executive <ArrowUpDown className="inline h-4 w-4" />
            </TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedClients.map((client) => (
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
    </div>
  );
}