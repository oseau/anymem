"use client";

import { useEffect, useState } from "react";
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
import { Edit } from "lucide-react";
import { updateDeck } from "@/app/actions/decks";

interface Deck {
  id: string;
  title: string;
}

export function EditDeckForm({ deck, dict }: { deck: Deck; dict: Dictionary }) {
  const [name, setName] = useState(deck.title);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateDeck(deck.id, name);
      setOpen(false);
    } catch (error) {
      console.error("Error updating deck:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Reset the form when the dialog opens
  useEffect(() => {
    if (open) {
      setName(deck.title);
    }
  }, [open, deck.title]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex-1 mr-1">
          <Edit className="mr-2 h-4 w-4" />
          {dict.decks.editDeck}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dict.decks.editDeck}</DialogTitle>
          <DialogDescription>
            {dict.decks.editDeckDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
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
            {isLoading ? dict.common.loading : dict.decks.saveDeckChanges}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
