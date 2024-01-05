import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('home');
  return <main className="flex flex-col justify-between h-[99svh]">
    <header className="flex flex-row w-full justify-between p-6 text-gray-900 font-bold">
      <span>Finya</span>
      <div>
        <Button>{t('createButtonLabel')}</Button>
      </div>
    </header>
    <section className="p-6">
      <h1>{t("title")}</h1>
      <h2>{t("subTitle")}</h2>
      <div className="flex justify-end"><Button>{t('createButtonLabel')}</Button></div>
    </section>
    <footer>footer</footer>
  </main>
}



