import {
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

type FormProps = {
  onSubmit: SubmitHandler<any>
  children: (form: UseFormReturn<any>) => React.ReactNode
  formProps?: UseFormProps<any>
  id?: string
}

export const Form = ({ onSubmit, children, formProps, id }: FormProps) => {
  const form = useForm(formProps)
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id={id}>
      {children(form)}
    </form>
  )
}
