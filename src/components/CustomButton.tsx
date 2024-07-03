import { Button } from 'antd'
import React from 'react'

type CustomButtonProps = {
  content: string
  htmlType?: 'submit' | undefined
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
  disabled?: boolean
}
const CustomButton: React.FC<CustomButtonProps> = ({
  htmlType,
  onClick,
  className,
  content,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      type="text"
      htmlType={htmlType || 'button'}
      className={`bg-[#80d423] text-white w-44  h-10 mt-5 ${className}`}
      disabled={disabled}
    >
      {content}
    </Button>
  )
}

export default CustomButton
