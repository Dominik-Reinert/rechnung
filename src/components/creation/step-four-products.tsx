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
export type StepFourMessages = {
    labels: {
        position: string;
        amount: string;
        unit: string;
        netPrice: string;
        grossPrice: string;
        currency: string;
        taxPercent: string;
        discountPercent: string;
    }
    subTitle: string;
    back: string;
    next: string;
}

interface Step4Props {
    initialValues: Partial<stepFourType>,
    messages: StepFourMessages
    onSubmit: (values: stepFourType) => void,
    onBackClick: () => void
}

export function Step4({ initialValues, messages: { labels, next, back }, onSubmit, onBackClick }: Step4Props): React.JSX.Element {
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
                        <FormLabel>{labels.position}</FormLabel>
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
                            <FormLabel>{labels.amount}</FormLabel>
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
                            <FormLabel>{labels.unit}</FormLabel>
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
                            <FormLabel>{labels.netPrice}</FormLabel>
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
                            <FormLabel>{labels.currency}</FormLabel>
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
                            <FormLabel>{labels.taxPercent}</FormLabel>
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
                            <FormLabel>{labels.discountPercent}</FormLabel>
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
                        <FormLabel>{labels.grossPrice}</FormLabel>
                        <FormControl>
                            <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='mt-4 flex justify-end gap-4'>
                <Button variant="outline" type='button' onClick={onBackClick}>{back}</Button>
                <Button disabled={!isValid} type='submit'>{next}</Button>
            </div>
        </form>
    </Form >
}