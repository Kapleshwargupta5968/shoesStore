import { FormProvider, useForm } from 'react-hook-form';

export const FormWrapper = ({ children, onSubmit, defaultValues = {}, className = "" }) => {
    const methods = useForm({ 
        defaultValues,
        mode: "onBlur" 
    });

    return (
        <FormProvider {...methods}>
            <form 
                onSubmit={methods.handleSubmit(onSubmit)} 
                className={`space-y-6 ${className}`}
            >
                {children}
            </form>
        </FormProvider>
    );
};
