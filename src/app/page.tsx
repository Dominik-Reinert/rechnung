'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

const stepOneSchema = z.object({
  name: z.string().min(2, 'min 2'),
  address: z.string().min(2, 'min 2'),
  postcode: z.string().min(2, 'min 2'),
  country: z.string().min(1, 'min 1'),
  taxNumber: z.string().min(2),
  email: z.string().email().optional(),
  website: z.string().optional(),
  bankName: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
})
type stepOneType = z.infer<typeof stepOneSchema>


const stepTwoSchema = z.object({
  clientName: z.string().min(2, 'min 2'),
  clientCountry: z.string().min(1, 'min 1'),
  billNumber: z.string().min(1, 'min 1'),
  billDate: z.date(),
  deliveryDate: z.date(),
  billDueDate: z.date().optional(),
  clientAddress: z.string().optional(),
  clientPostcode: z.string().optional(),
  subject: z.string().optional(),
  reference: z.string().optional(),
})
type stepTwoType = z.infer<typeof stepTwoSchema>




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
        <CardHeader><CardTitle>Rechnung erstellen</CardTitle></CardHeader>
        <CardContent>
          {state.step === 1 ? <Step1 initialValues={state} onSubmit={onSubmitStepOne} /> : null}
          {state.step === 2 ? <Step2 initialValues={state} onSubmit={onSubmitStepTwo} onBackClick={onBackClick} /> : null}
        </CardContent>
      </Card>
    </main>
  )
}


function Step1({ initialValues, onSubmit }: { initialValues: Partial<stepOneType>, onSubmit: (values: stepOneType) => void }): JSX.Element {
  const form = useForm<stepOneType>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: initialValues,
  })

  const { isValid } = form.formState;
  return <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <div className='flex gap-4 flex-col'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dein Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Straße + Hausnummer</FormLabel>
                <FormControl>
                  <Input required placeholder="Musterstraße 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem >
                <FormLabel>PLZ + Ort</FormLabel>
                <FormControl>
                  <Input required placeholder="11111 Musterstadt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <FormControl>
                  <Input required placeholder="Deutschland" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="max@mustermann.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webseite</FormLabel>
                <FormControl>
                  <Input placeholder="mustermann.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-4 flex-col'>
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bankname</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iban"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IBAN</FormLabel>
                <FormControl>
                  <Input placeholder="Musterstraße 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bic"
            render={({ field }) => (
              <FormItem >
                <FormLabel>BIC</FormLabel>
                <FormControl>
                  <Input placeholder="11111 Musterstadt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Steuernummer</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className='mt-4 flex justify-end'>
        <Button disabled={!isValid} type='submit'>Next</Button></div>
    </form>
  </Form>
}


function Step2({ initialValues, onSubmit, onBackClick }: { initialValues: Partial<stepTwoType>, onSubmit: (values: stepTwoType) => void, onBackClick: () => void }): JSX.Element {
  const form = useForm<stepTwoType>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: initialValues,
  })

  const { isValid } = form.formState;
  return <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <div className='flex gap-4 flex-col grow-[12]'>
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name des Kunden</FormLabel>
                <FormControl>
                  <Input required placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Straße + Hausnummer</FormLabel>
                <FormControl>
                  <Input placeholder="Musterstraße 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientPostcode"
            render={({ field }) => (
              <FormItem >
                <FormLabel>PLZ + Ort</FormLabel>
                <FormControl>
                  <Input placeholder="11111 Musterstadt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <FormControl>
                  <Input required placeholder="Deutschland" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-4 flex-col grow-[6]'>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Betreff</FormLabel>
                  <FormControl>
                    <Input required placeholder="Max Mustermann" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rechnungsnummer</FormLabel>
                  <FormControl>
                    <Input required placeholder="Musterstraße 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name="billDate"
              render={({ field }) => (
                <FormItem className='w-full' >
                  <FormLabel>Rechnungsdatum</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input required {...field} value={format(field.value, "PPP")} />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={newDate => field.onChange({ target: { value: newDate } })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billDueDate"
              render={({ field }) => (
                <FormItem className='w-full' >
                  <FormLabel>Zahlungsziel</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input required {...field} value={field.value ? format(field.value, "PPP") : undefined} />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={newDate => field.onChange({ target: { value: newDate } })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className='w-full' >
                  <FormLabel>Lieferdatum</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input required {...field} value={format(field.value, "PPP")} />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={newDate => field.onChange({ target: { value: newDate } })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className='w-full' >
                  <FormLabel>Steuernummer</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className='mt-4 flex justify-end gap-4'>
        <Button variant="outline" type='button' onClick={onBackClick}>Back</Button>
        <Button disabled={!isValid} type='submit'>Next</Button>
      </div>
    </form>
  </Form >
}