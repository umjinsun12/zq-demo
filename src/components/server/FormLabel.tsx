import { ReactElement } from 'react'
import FormText from './FormText'
import { COLOR } from '@/consts'

const FormLabel = ({ title }: { title: string }): ReactElement => (
  <FormText color={COLOR.core._400} fontType="R.12">
    {title}
  </FormText>
)

export default FormLabel
