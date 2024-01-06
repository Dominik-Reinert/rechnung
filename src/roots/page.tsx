import { Button } from "@/components/ui/button";
import { router } from "@/lib/roots-router";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('home');
  return <>
    <header className="flex flex-row w-full justify-between p-6 text-gray-900 font-bold align-baseline">
      <span className="text-xl md:text-2xl leading-normal">Finya</span>
      <div>
        <Button>
          <Link href={router.getHref('/create')}>{t('createButtonLabel')}</Link>
        </Button>
      </div>
    </header>
    <section className="flex flex-col p-6">
      <h1>{t("title")}</h1>
      <h2>{t("subTitle")}</h2>
      <div className="flex justify-end pt-6 md:pt-8 max-w-[650px]">
        <Button>
          <Link href={router.getHref('/create')}>{t('createButtonLabel')}</Link>
        </Button>
      </div>
    </section>
  </>
}



