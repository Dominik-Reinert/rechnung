'use client'

import { Step1, stepOneType } from '@/components/steps/step-one-your-data';
import { Step2, stepTwoType } from '@/components/steps/step-two-client-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type State = { step: number } & stepOneType & stepTwoType;
type Action = { type: "back" } | { type: "submit-step-one" } & stepOneType | { type: "submit-step-two" } & stepTwoType;

export default function Home() {
  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    const { type, ...payload } = action;
    switch (type) {
      case "submit-step-one":
      case "submit-step-two":
        return {
          ...state,
          ...payload,
          step: state.step + 1
        }
      case "back":
        return {
          ...state, step: state.step - 1
        }
      default: return state;
    }
  }, {
    step: 1,
    name: "",
    address: "",
    country: "",
    postcode: "",
    website: "",
    bankName: "",
    iban: "",
    bic: "",
    taxNumber: "",

    clientName: "",
    clientCountry: "",
    billNumber: "",
    billDate: new Date(),
    deliveryDate: new Date(),
    billDueDate: new Date(),
    clientAddress: "",
    clientPostcode: "",
    subject: "",
    reference: "",
  })

  const onBackClick = React.useCallback(() => {
    dispatch({ type: "back" })
  }, [])

  const onSubmitStepOne = React.useCallback((values: stepOneType) => {
    dispatch({ type: "submit-step-one", ...values })
  }, [])

  const onSubmitStepTwo = React.useCallback((values: stepTwoType) => {
    dispatch({ type: "submit-step-two", ...values })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Rechnung erstellen</CardTitle>
          <CardDescription>
            {state.step === 1 ? "Deine Daten" : undefined}
            {state.step === 2 ? "Kundendaten" : undefined}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.step === 1 ? <Step1 initialValues={state} onSubmit={onSubmitStepOne} /> : null}
          {state.step === 2 ? <Step2 initialValues={state} onSubmit={onSubmitStepTwo} onBackClick={onBackClick} /> : null}
        </CardContent>
      </Card>
    </main>
  )
}



