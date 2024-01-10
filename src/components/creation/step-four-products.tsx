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
    amount: z.string().min(1)
        .transform((value) => parseFloat(value))
        .refine(val => !isNaN(val), 'Must be a valid number'),
    unit: z.string().min(1),
    price: z.string()
        .min(1)
        .transform((value) => parseFloat(value))
        .refine(val => !isNaN(val), 'Must be a valid number'),
    currency: z.string().min(1),
    tax: z.string()
        .min(1)
        .transform((value) => parseFloat(value))
        .refine(val => !isNaN(val), 'Must be a valid number'),
    discount: z.string()
        .optional()
        .transform((value) => value ? parseFloat(value) : value)
        .refine(val => val ? !isNaN(val as number) : true, 'Must be a valid number'),
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
    const resultRef = React.useRef<string | undefined>(undefined);
    React.useEffect(() => {
        const { unsubscribe } = form.watch(values => {
            (values.positions?.filter(e => e) as z.infer<typeof positionSchema>[]).forEach(({ amount, price, tax, discount, currency }, index) => {
                if (![amount, price, tax, discount].some(e => e === undefined)) {
                    resultRef.current = `${amount * price * (1 + (tax / 100)) * (1 - Number(discount ?? 0) / 100)}${currency}`;
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
                            <Input required {...field} />
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
                                <Input required {...field} type='number' />
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
                                <Input required {...field} />
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
                                <Input required {...field} type='number' />
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
                                <Input required {...field} />
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
                                <Input required {...field} type='number' />
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
                                <Input {...field} type='number' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormItem>
                <FormLabel>{labels.grossPrice}</FormLabel>
                <FormControl>
                    <Input value={resultRef.current} disabled />
                </FormControl>
                <FormMessage />
            </FormItem>

            <div className='mt-4 flex justify-end gap-4'>
                <Button variant="outline" type='button' onClick={onBackClick}>{back}</Button>
                <Button disabled={!isValid} type='submit'>{next}</Button>
            </div>
        </form>
    </Form >
}