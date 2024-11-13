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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Pen, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useMemo } from "react";

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
    product: '',
    status: '',
    accountExec: ''
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

  const uniqueProducts = useMemo(() => [...new Set(clients.map(client => client.product))], [clients]);
  const uniqueStatuses = useMemo(() => [...new Set(clients.map(client => client.status))], [clients]);
  const uniqueExecs = useMemo(() => [...new Set(clients.map(client => client.accountExec))], [clients]);

  const filteredAndSortedClients = useMemo(() => {
    let result = [...clients];

    // Apply filters
    if (filters.product) {
      result = result.filter(client => client.product === filters.product);
    }
    if (filters.status) {
      result = result.filter(client => client.status === filters.status);
    }
    if (filters.accountExec) {
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
      <div className="flex gap-4">
        <Select value={filters.product} onValueChange={(value) => setFilters(prev => ({ ...prev, product: value }))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Products</SelectItem>
            {uniqueProducts.map(product => (
              <SelectItem key={product} value={product}>{product}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.accountExec} onValueChange={(value) => setFilters(prev => ({ ...prev, accountExec: value }))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Account Executive" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Account Executives</SelectItem>
            {uniqueExecs.map(exec => (
              <SelectItem key={exec} value={exec}>{exec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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