import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  filters: {
    product: string;
    status: string;
    accountExec: string;
  };
  uniqueProducts: string[];
  uniqueStatuses: string[];
  uniqueExecs: string[];
  onFilterChange: (key: string, value: string) => void;
}

export function ClientFilters({ 
  filters, 
  uniqueProducts, 
  uniqueStatuses, 
  uniqueExecs, 
  onFilterChange 
}: FiltersProps) {
  return (
    <div className="flex gap-4">
      <Select 
        value={filters.product} 
        onValueChange={(value) => onFilterChange('product', value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Product" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>
          {uniqueProducts.map(product => (
            <SelectItem key={product} value={product}>{product}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filters.status} 
        onValueChange={(value) => onFilterChange('status', value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {uniqueStatuses.map(status => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={filters.accountExec} 
        onValueChange={(value) => onFilterChange('accountExec', value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Account Executive" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Account Executives</SelectItem>
          {uniqueExecs.map(exec => (
            <SelectItem key={exec} value={exec}>{exec}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}