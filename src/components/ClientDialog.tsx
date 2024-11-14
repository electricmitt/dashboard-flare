import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

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

interface ClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedClient: Client) => void;
}

export function ClientDialog({ client, open, onOpenChange, onSave }: ClientDialogProps) {
  const [editedClient, setEditedClient] = useState(client);

  const handleSave = () => {
    if (!editedClient.company || !editedClient.product || !editedClient.status || !editedClient.channel || !editedClient.accountExec) {
      toast("Please fill in all required fields");
      return;
    }
    onSave(editedClient);
    onOpenChange(false);
    toast("Client updated successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Basic Information</h3>
            <Input
              placeholder="Company"
              value={editedClient.company}
              onChange={(e) =>
                setEditedClient({ ...editedClient, company: e.target.value })
              }
            />
            <Input
              placeholder="Product"
              value={editedClient.product}
              onChange={(e) =>
                setEditedClient({ ...editedClient, product: e.target.value })
              }
            />
            <Input
              placeholder="Status"
              value={editedClient.status}
              onChange={(e) =>
                setEditedClient({ ...editedClient, status: e.target.value })
              }
            />
            <Input
              placeholder="Channel"
              value={editedClient.channel}
              onChange={(e) =>
                setEditedClient({ ...editedClient, channel: e.target.value })
              }
            />
            <Input
              placeholder="Account Executive"
              value={editedClient.accountExec}
              onChange={(e) =>
                setEditedClient({ ...editedClient, accountExec: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contract Details</h3>
            <Input
              type="date"
              placeholder="Start Date"
              value={editedClient.startDate || ''}
              onChange={(e) =>
                setEditedClient({ ...editedClient, startDate: e.target.value })
              }
            />
            <Input
              type="date"
              placeholder="End Date"
              value={editedClient.endDate || ''}
              onChange={(e) =>
                setEditedClient({ ...editedClient, endDate: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Deal Amount"
              value={editedClient.dealAmount || ''}
              onChange={(e) =>
                setEditedClient({ ...editedClient, dealAmount: parseFloat(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Monthly Volume"
              value={editedClient.monthlyVolume || ''}
              onChange={(e) =>
                setEditedClient({ ...editedClient, monthlyVolume: parseFloat(e.target.value) })
              }
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}