'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Textarea } from '../ui/textarea'


const stepThreeSchema = z.object({
    text: z.string().min(1)
})
export type stepThreeType = z.infer<typeof stepThreeSchema>


export function Step3({ initialValues, onSubmit, onBackClick }: { initialValues: Partial<stepThreeType>, onSubmit: (values: stepThreeType) => void, onBackClick: () => void }): React.JSX.Element {
    const form = useForm<stepThreeType>({
        resolver: zodResolver(stepThreeSchema),
        defaultValues: initialValues,
    })

    const { isValid } = form.formState;
    return <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                            <Textarea rows={3} cols={70} required  {...field} />
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
    </Form>
}