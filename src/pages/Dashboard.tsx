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

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Dashboard = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
    },
  ]);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
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
    setNewClient({ name: "", email: "", phone: "" });
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
          <div className="flex gap-4 mb-8">
            <Input
              placeholder="Name"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={newClient.email}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) =>
                setNewClient({ ...newClient, phone: e.target.value })
              }
            />
            <Button onClick={handleAddClient}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </div>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
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