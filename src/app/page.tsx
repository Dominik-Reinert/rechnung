'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"

const schema = z.object({
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



export default function Home() {
  const onSubmit = React.useCallback((values: z.infer<typeof schema>) => {
    alert(JSON.stringify(values));
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader><CardTitle>Rechnung erstellen</CardTitle></CardHeader>
        <CardContent>
          <Step1 onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </main>
  )
}


function Step1({ onSubmit }: { onSubmit: (values: z.infer<typeof schema>) => void }): JSX.Element {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      country: "",
      postcode: "",
      website: "",
      bankName: "",
      iban: "",
      bic: "",
      taxNumber: ""
    },
  })

  const { isDirty, isValid } = form.formState;
  console.log(isDirty, isValid)
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
        <Button disabled={!isValid || !isDirty} type='submit'>Next</Button></div>
    </form>
  </Form>
}