'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Step1, StepOneMessages, stepOneType } from './step-one-your-data';
import { Step2, StepTwoMessages, stepTwoType } from './step-two-client-data';
import { Step3, stepThreeType } from './step-three-text';
import { Step4, StepFourMessages, stepFourType } from './step-four-products';

type State = { step: number } & stepOneType & stepTwoType & stepThreeType & stepFourType;
type Action =
    | { type: "back" }
    | { type: "submit-step-one" } & stepOneType
    | { type: "submit-step-two" } & stepTwoType
    | { type: "submit-step-three" } & stepThreeType
    | { type: "submit-step-four" } & stepFourType;

export type CreateWizardMessages = {
    title: string;
    stepOneMessages: StepOneMessages;
    stepTwoMessages: StepTwoMessages;
    stepFourMessages: StepFourMessages;
}

export function CreationWizard({ title, stepOneMessages, stepTwoMessages, stepFourMessages }: CreateWizardMessages): React.JSX.Element {
    const [state, dispatch] = React.useReducer((state: State, action: Action) => {
        const { type, ...payload } = action;
        switch (type) {
            case "submit-step-one":
            case "submit-step-two":
            case "submit-step-three":
            case "submit-step-four":
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
        taxnumber: "",

        text: `Sehr geehrte Damen und Herren,
    vielen Dank für Ihren Auftrag und das damit verbundene Vertrauen!
    Hiermit stelle ich Ihnen die folgenden Leistungen in Rechnung:`,

        positions: []
    })


    return (
        <div className="flex flex-col items-center justify-between p-24">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {state.step === 1 ? stepOneMessages.subTitle : undefined}
                        {state.step === 2 ? stepTwoMessages.subTitle : undefined}
                        {state.step === 3 ? "Kundendaten" : undefined}
                        {state.step === 4 ? stepFourMessages.subTitle : undefined}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {state.step === 1 ?
                        <Step1
                            initialValues={state}
                            onSubmit={(values) => dispatch({ type: "submit-step-one", ...values })}
                            messages={stepOneMessages}
                        />
                        : null}
                    {state.step === 2 ?
                        <Step2
                            initialValues={state}
                            onSubmit={(values) => dispatch({ type: "submit-step-two", ...values })}
                            onBackClick={() => dispatch({ type: "back" })}
                            messages={stepTwoMessages}
                        />
                        : null}
                    {state.step === 3 ?
                        <Step3
                            initialValues={state}
                            onSubmit={(values) => dispatch({ type: "submit-step-three", ...values })}
                            onBackClick={() => dispatch({ type: "back" })}
                        />
                        : null}
                    {state.step === 4 ?
                        <Step4
                            initialValues={state}
                            onSubmit={(values) => dispatch({ type: "submit-step-four", ...values })}
                            onBackClick={() => dispatch({ type: "back" })}
                            messages={stepFourMessages}
                        />
                        : null}
                </CardContent>
            </Card>
        </div>
    )
}