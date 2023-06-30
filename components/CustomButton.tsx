import { CustomButtonProps } from "@/types";

const CustomButton = ({ title, handleClick, icon, containerStyle, type }: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`outline-none px-4 py-1.5 md:py-2.5  md:px-6 text-center flex items-center justify-center  capitalize ${containerStyle} relative`}
    >
      <span>{title}</span>
      {icon && <div className='absolute right-8'>
        {icon}
      </div>}
    </button>
  )
}

export default CustomButton;