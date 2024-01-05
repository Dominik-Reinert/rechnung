import { CreationWizard } from "@/components/creation/wizard";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations("index");
  return <><h1>{t('title')}</h1><CreationWizard /></>
}


