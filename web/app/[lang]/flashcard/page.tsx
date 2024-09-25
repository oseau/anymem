import { Flashcard } from "@/components/Flashcard";
import { Locale } from "@/i18n-config";

export default function FlashcardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Flashcard
        params={{
          front: "ruler",
          choices: [
            "A soft, pliable material used for removing pencil marks, typically made from synthetic rubber or vinyl plastic",
            "尺子",
          ],
          correctAnswer: 1,
          timeLimit: 10,
          lang: lang,
        }}
      />
    </div>
  );
}
