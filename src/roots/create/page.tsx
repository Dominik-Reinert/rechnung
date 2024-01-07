import { CreationWizard } from "@/components/creation/wizard";
import { useTranslations } from "next-intl";

export default function Home() {
  const baseT = useTranslations("base");
  const wizardT = useTranslations("wizard");
  return <CreationWizard
    title={wizardT('title')}
    stepOneMessages={{
      labels: {
        name: wizardT("name"),
        street: wizardT("street"),
        bank: wizardT("bank"),
        IBAN: wizardT("IBAN"),
        zip: wizardT("zip"),
        BIC: wizardT("BIC"),
        country: wizardT("country"),
        taxNumber: wizardT("taxNumber"),
        email: wizardT("email"),
        website: wizardT("website"),
      },
      subTitle: wizardT("subTitle.stepOne"),
      next: baseT("next")
    }}
    stepFourMessages={{
      labels: {
        position: wizardT("position"),
        amount: wizardT("amount"),
        unit: wizardT("unit"),
        netPrice: wizardT("netPrice"),
        grossPrice: wizardT("grossPrice"),
        currency: wizardT("currency"),
        taxPercent: wizardT("taxPercent"),
        discountPercent: wizardT("discountPercent"),
      },
      subTitle: wizardT("subTitle.stepFour"),
      next: baseT("next"),
      back: baseT("back")
    }}
  />
}



