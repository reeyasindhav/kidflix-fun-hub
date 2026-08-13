import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { type AgeBand, ageBands } from "@/data/kidflix";

type AddKidDialogProps = {
  onAdd: (kid: {
    id: string;
    name: string;
    age: number;
    band: AgeBand;
    color: "sunny" | "mint" | "grape" | "primary";
    streak: number;
    dailyLimit: number;
    watchedToday: number;
    favourite: string;
    avatarSeed: string;
  }) => void;
};

const tones = ["sunny", "mint", "grape", "primary"] as const;

export function AddKidDialog({ onAdd }: AddKidDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(5);
  const [band, setBand] = useState<AgeBand>("3-5");

  const canSubmit = name.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const id = name.trim().toLowerCase().replace(/\s+/g, "-");
    onAdd({
      id,
      name: name.trim(),
      age,
      band,
      color: tones[Math.floor(Math.random() * tones.length)],
      streak: 0,
      dailyLimit: band === "3-5" ? 45 : band === "6-8" ? 80 : 100,
      watchedToday: 0,
      favourite: "Luna & Friends",
      avatarSeed: `kidflix-avatar-${id}`,
    });
    setName("");
    setAge(5);
    setBand("3-5");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="animate-pop-in grid place-items-center rounded-4xl border-3 border-dashed border-border bg-transparent p-6 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-secondary">
            <Plus className="size-6" />
          </span>
          <p className="mt-3 font-display text-lg">Add a kid</p>
          <p className="text-xs font-bold text-muted-foreground">Up to 6 profiles</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a kid</DialogTitle>
          <DialogDescription>Create a new profile for your child.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kid's name"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={1}
              max={17}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Age tier</Label>
            <Select value={band} onValueChange={(v) => setBand(v as AgeBand)}>
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                {ageBands
                  .filter((b) => b.id !== "all")
                  .map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Add profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
