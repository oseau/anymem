"use client";

import { Button } from "@/components/ui/button";
import { cloneDeck } from "@/app/actions/decks";
import { useRouter } from "next/navigation";

interface CloneButtonProps {
  id: string;
  label: string;
}

export default function CloneButton({ id, label }: CloneButtonProps) {
  const router = useRouter();
  const onClickClone = async () => {
    try {
      const res = await cloneDeck(id);
      console.log("Deck cloned:", res);
      router.push(`/decks`);
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
