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
    stepTwoMessages={{
      labels: {
        clientName: wizardT('clientName'),
        clientAddress: wizardT('clientAddress'),
        clientPostcode: wizardT('clientPostcode'),
        clientCountry: wizardT('clientCountry'),
        subject: wizardT('subject'),
        billNumber: wizardT('billNumber'),
        billDate: wizardT('billDate'),
        billDueDate: wizardT('billDueDate'),
        deliveryDate: wizardT('deliveryDate'),
        taxnumber: wizardT('taxnumber')
      },
      subTitle: wizardT("subTitle.stepTwo"),
      next: baseT("next"),
      back: baseT("back"),
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



