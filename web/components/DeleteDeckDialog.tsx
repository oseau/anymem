"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type Dictionary } from "@/get-dictionary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteDeck } from "@/app/actions/decks";

interface Deck {
  id: string;
  title: string;
}

export function DeleteDeckDialog({
  deck,
  dict,
}: {
  deck: Deck;
  dict: Dictionary;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onDelete() {
    setIsLoading(true);
    try {
      await deleteDeck(deck.id);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting deck:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex-1 ml-1">
          <Trash2 className="mr-2 h-4 w-4" />
          {dict.decks.deleteDeck}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dict.decks.deleteDeck}
            <span className="mx-2 font-bold line-through">
              「{deck.title}」
            </span>
          </DialogTitle>
          <DialogDescription>
            {dict.decks.deleteDeckDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {dict.common.cancel}
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {isLoading ? dict.common.loading : dict.decks.confirmDelete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
