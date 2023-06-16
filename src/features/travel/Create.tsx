import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../../components/Input';

type Inputs = {
	example: string;
	exampleRequired: string;
};

export default function TravelCreate() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<div className="py-12">
			<div className="mt-8 max-w-md">
				<div className="grid grid-cols-1 gap-6">
					<h2 className="text-2xl font-bold">Create travel</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* register your input into the hook by invoking the "register" function */}
						<label className="block">
							<Input type="text" {...register('example')} />
						</label>

						{/* include validation with required or other standard HTML validation rules */}
						<label className="block">
							<input
								type="text"
								className="
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              "
								{...register('exampleRequired', { required: true })}
							/>
						</label>

						{/* errors will return when field validation fails  */}
						{errors.exampleRequired && <span>This field is required</span>}

						<button type="submit" className="btn-primary btn">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
