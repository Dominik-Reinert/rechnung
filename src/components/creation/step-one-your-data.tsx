'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
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
export type stepOneType = z.infer<typeof stepOneSchema>

export function Step1({ initialValues, onSubmit }: { initialValues: Partial<stepOneType>, onSubmit: (values: stepOneType) => void }): React.JSX.Element {
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