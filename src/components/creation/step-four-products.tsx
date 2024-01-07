'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from '../ui/button'

const positionSchema = z.object({
    name: z.string().min(1),
    amount: z.number(),
    unit: z.string().min(1),
    price: z.number().min(1),
    currency: z.string().min(1),
    tax: z.number(),
    discount: z.number().optional(),
    result: z.number()
})

const stepFourSchema = z.object({ positions: z.array(positionSchema) })
export type stepFourType = z.infer<typeof stepFourSchema>


// eslint-disable-next-line no-unused-vars
export function Step4({ initialValues, onSubmit, onBackClick }: { initialValues: Partial<stepFourType>, onSubmit: (values: stepFourType) => void, onBackClick: () => void }): React.JSX.Element {
    const form = useForm<stepFourType>({
        resolver: zodResolver(stepFourSchema),
        defaultValues: initialValues,
    })

    const { isValid } = form.formState;
    React.useEffect(() => {
        const { unsubscribe } = form.watch(values => {
            (values.positions?.filter(e => e) as z.infer<typeof positionSchema>[]).forEach(({ amount, price, tax, discount, result }, index) => {
                if (![amount, price, tax, discount].some(e => e === undefined)) {
                    const newResult = amount * price * (1 + (tax / 100)) * (1 - (discount ?? 0) / 100)
                    if (newResult !== result) {
                        form.setValue(`positions.${index}.result`, newResult);
                    }
                }
            })
        });

        return unsubscribe
    }, [form])
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name={`positions.${0}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <Input required placeholder="Produkt eins" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='flex gap-4'>
                <FormField
                    control={form.control}
                    name={`positions.${0}.amount`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Anzahl/Menge</FormLabel>
                            <FormControl>
                                <Input required placeholder="1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`positions.${0}.unit`}
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Einheit</FormLabel>
                            <FormControl>
                                <Input required placeholder="Stück" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex gap-4'>
                <FormField
                    control={form.control}
                    name={`positions.${0}.price`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nettopreis</FormLabel>
                            <FormControl>
                                <Input required placeholder="100" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`positions.${0}.currency`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Währung</FormLabel>
                            <FormControl>
                                <Input required placeholder="€" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex gap-4'>
                <FormField
                    control={form.control}
                    name={`positions.${0}.tax`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Steuersatz (%)</FormLabel>
                            <FormControl>
                                <Input required placeholder="19" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`positions.${0}.discount`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rabatt (%)</FormLabel>
                            <FormControl>
                                <Input placeholder="10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name={`positions.${0}.result`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bruttopreis</FormLabel>
                        <FormControl>
                            <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='mt-4 flex justify-end gap-4'>
                <Button variant="outline" type='button' onClick={onBackClick}>Back</Button>
                <Button disabled={!isValid} type='submit'>Next</Button>
            </div>
        </form>
    </Form >
}