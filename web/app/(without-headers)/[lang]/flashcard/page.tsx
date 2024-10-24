import { Flashcard } from "@/components/Flashcard";
import { getDictionary } from "@/get-dictionary";
import { type Locale, i18n } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function FlashcardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

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
          dict,
        }}
      />
    </div>
  );
}
