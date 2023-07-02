import { HTMLAttributes, ReactElement } from 'react'
import View from './View'
import FormLabel from './FormLabel'

type FormInputProps = {
  label?: string,
  value : number,
} & HTMLAttributes<HTMLInputElement>

const FormInput = ({ label, value, ...rest }: FormInputProps): ReactElement => (
  <View className="gap-2">
    {label && <FormLabel title={label} />}
    <input
      value={value}
      style={{
        padding: '0 10px',
        height: 40,
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        backgroundColor: 'transparent',
      }}
      {...rest}
    />
  </View>
)

export default FormInput
