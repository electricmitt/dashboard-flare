import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Client {
  id: number;
  company: string;
  product: string;
  status: string;
  channel: string;
  accountExec: string;
}

const Dashboard = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      company: "Acme Corp",
      product: "Enterprise Suite",
      status: "Active",
      channel: "Direct",
      accountExec: "John Smith",
    },
    {
      id: 2,
      company: "TechStart Inc",
      product: "Basic Plan",
      status: "Pending",
      channel: "Partner",
      accountExec: "Sarah Johnson",
    },
  ]);
  const [newClient, setNewClient] = useState({ 
    company: "", 
    product: "", 
    status: "", 
    channel: "", 
    accountExec: "" 
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddClient = () => {
    if (!newClient.company || !newClient.product || !newClient.status || !newClient.channel || !newClient.accountExec) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setClients([
      ...clients,
      { ...newClient, id: clients.length + 1 },
    ]);
    setNewClient({ company: "", product: "", status: "", channel: "", accountExec: "" });
    setDialogOpen(false);
    toast({
      title: "Success",
      description: "Client added successfully",
    });
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
    toast({
      title: "Success",
      description: "Client deleted successfully",
    });
  };

  const filteredClients = clients.filter((client) =>
    Object.values(client)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your client database
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Company"
                    value={newClient.company}
                    onChange={(e) =>
                      setNewClient({ ...newClient, company: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Product"
                    value={newClient.product}
                    onChange={(e) =>
                      setNewClient({ ...newClient, product: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Status"
                    value={newClient.status}
                    onChange={(e) =>
                      setNewClient({ ...newClient, status: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Channel"
                    value={newClient.channel}
                    onChange={(e) =>
                      setNewClient({ ...newClient, channel: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Account Executive"
                    value={newClient.accountExec}
                    onChange={(e) =>
                      setNewClient({ ...newClient, accountExec: e.target.value })
                    }
                  />
                  <Button onClick={handleAddClient} className="w-full">
                    Add Client
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

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
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.company}</TableCell>
                  <TableCell>{client.product}</TableCell>
                  <TableCell>{client.status}</TableCell>
                  <TableCell>{client.channel}</TableCell>
                  <TableCell>{client.accountExec}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;