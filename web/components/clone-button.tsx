"use client";

import { Button } from "@/components/ui/button";
import { cloneDeck } from "@/app/actions/decks";

interface CloneButtonProps {
  id: string;
  label: string;
}

export default function CloneButton({ id, label }: CloneButtonProps) {
  const onClickClone = async () => {
    try {
      const res = await cloneDeck(id);
      console.log("Deck cloned:", res);
      // TODO: Handle successful clone (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Error cloning deck:", error);
      // TODO: Handle error (e.g., show an error message)
    }
  };

  return (
    <Button className="w-full" onClick={onClickClone}>
      {label}
    </Button>
  );
}
