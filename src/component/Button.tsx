import { FC } from "react";

const ButtonDefaut : FC<ButtonProps>= ({className = '', onClick,children}) => {
    return (
        <button type="button" onClick={onClick} className={`p-2.5 border border-white rounded-md hover:bg-[#8383837d] ${className}`}>{children}</button>
    );
}

export default ButtonDefaut;
