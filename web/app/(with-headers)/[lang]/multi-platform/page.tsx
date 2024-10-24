import { getDictionary } from "@/get-dictionary";
import { type Locale, i18n } from "@/i18n-config";
import { DesktopIcon, MobileIcon, Pencil2Icon } from "@radix-ui/react-icons";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function MultiPlatformPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {dictionary.features.multiPlatform.title}
      </h1>
      <p className="text-xl mb-8">
        {dictionary.features.multiPlatform.description}
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <PlatformCard
          icon={<MobileIcon className="w-12 h-12" />}
          title={dictionary.features.multiPlatform.mobile.title}
          description={dictionary.features.multiPlatform.mobile.description}
        />
        <PlatformCard
          icon={<DesktopIcon className="w-12 h-12" />}
          title={dictionary.features.multiPlatform.desktop.title}
          description={dictionary.features.multiPlatform.desktop.description}
        />
        <PlatformCard
          icon={<Pencil2Icon className="w-12 h-12" />}
          title={dictionary.features.multiPlatform.paper.title}
          description={dictionary.features.multiPlatform.paper.description}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          {dictionary.features.multiPlatform.syncFeature.title}
        </h2>
        <p className="mb-6">
          {dictionary.features.multiPlatform.syncFeature.description}
        </p>
      </div>
    </>
  );
}

function PlatformCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}
