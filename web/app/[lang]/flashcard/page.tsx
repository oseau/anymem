import { Flashcard } from "@/components/Flashcard";

export default function FlashcardPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Flashcard
        front="ruler"
        choices={[
          "A soft, pliable material used for removing pencil marks, typically made from synthetic rubber or vinyl plastic",
          "尺子",
        ]}
        correctAnswer={1}
        timeLimit={10}
      />
    </div>
  );
}
