import { forwardRef } from 'react';

interface InputProps {
	label?: string;
	[key: string]: unknown;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, ...rP }, ref) {
	return (
		<label className="block">
			{label ? <span className="text-gray-700">{label}</span> : null}
			<input
				ref={ref}
				className="
      mt-1
      block
      w-full
      rounded-md
      border-gray-300
      shadow-sm
      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
    "
				{...rP}
			/>
		</label>
	);
});

export default Input;
