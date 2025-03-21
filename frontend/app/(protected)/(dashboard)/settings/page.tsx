
"use client"
// app/settings/page.tsx (server component)
import TabWrapper from '@/components/dashboard/tabs/TabWrapper';
import CardWrapper from '@/components/generic/CardWrapper';
import Text from '@/components/generic/Text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UpdateSettingsInput, UpdateSettingsSchema } from '@/libs/validations';
import axios from 'axios';
import { useState } from 'react';


export default function Page() {
    const [formData, setFormData] = useState<UpdateSettingsInput>({
        GOOGLE_API_KEY: '',
        CSE_ID: '',
    })

    const [status, setStatus] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
     const [errors, setErrors] = useState<{ [key in keyof UpdateSettingsInput]?: string }>({});
     
    const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErrors({});
        setStatus(null);
        // Validate input using Zod
        const result = UpdateSettingsSchema.safeParse(formData);
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                GOOGLE_API_KEY: formattedErrors.GOOGLE_API_KEY?._errors[0],
                CSE_ID: formattedErrors.CSE_ID?._errors[0],
            });
            console.log('Error:', formattedErrors);
            console.log(formData);
            return;
        }

        // Submit data to API
        try {
            const response = await axios.patch("/api/user/settings", JSON.stringify(formData), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (response.status !== 200) {
                throw new Error("Settings save failed");
            }

            setStatus(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };
    
  return (
    <TabWrapper>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">Customize your page settings</p>
      </div>
      <CardWrapper className='min-w-[25rem] mt-4'>
        <div className="flex flex-col mt-2">
            <h2 className="text-2xl font-semibold">API Keys</h2>
            <p className="text-sm text-gray-500">Enter your API keys below to update your settings.</p>
        </div>
        <form className="flex flex-col gap-2 max-w-[30rem] mt-4" onSubmit={saveSettings}>
            {
                status && <div className="text-green-500">{status}</div>
            }
            <Input name="GOOGLE_API_KEY" label="GOOGLE_API_KEY" placeholder="****************" onChange={handleChange} errors={errors.GOOGLE_API_KEY}/>
            <Input name="CSE_ID" label="CSE_ID" placeholder="****************" onChange={handleChange} errors={errors.CSE_ID}/>
            <Button className="cursor-pointer" type="submit">
            Update
            </Button>
            <p className="text-xs text-gray-500 text-center">*For safety purposes we keep your API keys saved and not send over <br /> to frontend UI.</p>
        </form>
      </CardWrapper>
    </TabWrapper>
  );
}
