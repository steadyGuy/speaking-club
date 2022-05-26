import { Button } from '@mui/material'
import { DefaultComponentProps, OverridableTypeMap } from '@mui/material/OverridableComponent';
import React, { FC } from 'react'

interface ConnectingButtonProps extends DefaultComponentProps<OverridableTypeMap> {
  title: string;
}

const ConnectingButton: FC<ConnectingButtonProps> = ({ title, ...props }) => {
  return (
    <Button {...props}>{title}</Button>
  )
}

export default ConnectingButton