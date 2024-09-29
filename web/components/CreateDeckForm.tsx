"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Dictionary } from "@/get-dictionary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDeck } from "@/app/actions/decks";

export function CreateDeckForm({
  params: { dict },
}: {
  params: { dict: Dictionary };
}) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createDeck(name); // revalidatePath called inside, so no need to refresh
      setOpen(false);
      setName("");
    } catch (error) {
      console.error("Error creating deck:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {dict.decks.createNewDeck}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.decks.createNewDeck}</DialogTitle>
          <DialogDescription>
            {dict.decks.createNewDeckDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{dict.decks.deckName}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={dict.decks.deckNamePlaceholder}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? dict.common.loading : dict.decks.createNewDeck}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
