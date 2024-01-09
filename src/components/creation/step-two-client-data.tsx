'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"


const stepTwoSchema = z.object({
    clientName: z.string().min(2, 'min 2'),
    clientCountry: z.string().min(1, 'min 1'),
    billNumber: z.string().min(1, 'min 1'),
    billDate: z.date(),
    deliveryDate: z.date(),
    taxnumber: z.string(),
    billDueDate: z.date().optional(),
    clientAddress: z.string().optional(),
    clientPostcode: z.string().optional(),
    subject: z.string().optional(),
})
export type stepTwoType = z.infer<typeof stepTwoSchema>
export type StepTwoMessages = {
    labels: {
        clientName: string;
        clientAddress: string;
        clientPostcode: string;
        clientCountry: string;
        subject: string;
        billNumber: string;
        billDate: string;
        billDueDate: string;
        deliveryDate: string;
        taxnumber: string;
    }
    subTitle: string;
    back: string;
    next: string;
}

interface StepTwoProps {
    initialValues: Partial<stepTwoType>;
    messages: StepTwoMessages;
    onSubmit: (values: stepTwoType) => void;
    onBackClick: () => void;
}


export function Step2({ initialValues, messages: { labels, next, back }, onSubmit, onBackClick }: StepTwoProps): React.JSX.Element {
    const form = useForm<stepTwoType>({
        resolver: zodResolver(stepTwoSchema),
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
                                <FormLabel>{labels.clientName}</FormLabel>
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
                                <FormLabel>{labels.clientAddress}</FormLabel>
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
                                <FormLabel>{labels.clientPostcode}</FormLabel>
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
                                <FormLabel>{labels.clientCountry}</FormLabel>
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
                                    <FormLabel>{labels.subject}</FormLabel>
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
                                    <FormLabel>{labels.billNumber}</FormLabel>
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
                                    <FormLabel>{labels.billDate}</FormLabel>
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
                                    <FormLabel>{labels.billDueDate}</FormLabel>
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
                                    <FormLabel>{labels.deliveryDate}</FormLabel>
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
                            name="taxnumber"
                            render={({ field }) => (
                                <FormItem className='w-full' >
                                    <FormLabel>{labels.taxnumber}</FormLabel>
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
                <Button variant="outline" type='button' onClick={onBackClick}>{back}</Button>
                <Button disabled={!isValid} type='submit'>{next}</Button>
            </div>
        </form>
    </Form >
}