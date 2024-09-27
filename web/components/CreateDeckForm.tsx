"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export function CreateDeckForm({
  params: { dict },
}: {
  params: { dict: Dictionary };
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setOpen(false);
        setName("");
        setDescription("");
        router.refresh();
      } else {
        console.error("Failed to create deck");
      }
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
          <div>
            <Label htmlFor="description">{dict.decks.deckDescription}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={dict.decks.deckDescriptionPlaceholder}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? dict.common.loading : dict.decks.createDeck}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
