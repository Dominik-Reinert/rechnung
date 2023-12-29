'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as z from "zod"


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
export type stepTwoType = z.infer<typeof stepTwoSchema>


export function Step2({ initialValues, onSubmit, onBackClick }: { initialValues: Partial<stepTwoType>, onSubmit: (values: stepTwoType) => void, onBackClick: () => void }): JSX.Element {
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