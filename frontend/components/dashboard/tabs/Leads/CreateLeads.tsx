import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateLeadInput, CreateLeadSchema } from '@/libs/validations'
import Spinner from '@/components/generic/Spinner'
import { useRouter } from 'next/navigation'

const CreateLeads = () => {
    const [formData, setFormData] = React.useState({
        query: '',
        pages: 1
    })
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const router = useRouter()
    const [errors, setErrors] = useState<{ [key in keyof CreateLeadInput]?: string }>({});
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setErrors({});
        // Convert pages to number
        try{
            formData.pages = Number(formData.pages);
        }catch{
            setErrors({
                pages: 'Please enter a valid number'
            });
            setLoading(false);
            return;
        }
        // Validate input using Zod
        const result = CreateLeadSchema.safeParse(formData);
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
            query: formattedErrors.query?._errors[0],
            pages: formattedErrors.pages?._errors[0],
            });
            console.log('Error:', formattedErrors);
            console.log(formData);
            setLoading(false);
            return;
        }

        // Submit data to API
        try {
            const response = await fetch("/api/leads/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setLoading(false);
            throw new Error("Lead generation failed");
            }

            const data = await response.json();
            setLoading(false);
            console.log('Success:', data);
            router.refresh();
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setStatus(error.message);
            } else {
                setStatus("Failed to create lead.");
            }
            setLoading(false);
        }
    }
  return (
    <Dialog>
        <DialogTrigger><Button className='mt-4'>Create New Lead</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create a new lead.</DialogTitle>
            <DialogDescription>
                Please fill out the form below to create a new lead. Ensure all required fields are completed.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                    <Input type="text" placeholder="Query" name='query' onChange={handleChange} errors={errors.query}/>
                    <Input type="number" placeholder="No. Of Pages" name='pages' defaultValue={1} onChange={handleChange} errors={errors.pages}/>
                </div>
                <Button>{loading? <>Generating <Spinner/></> : "Create"}</Button>
                {status && <div className="text-red-500 text-sm">{status}</div>}
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateLeads