import { SubmitHandler, useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box } from '@chakra-ui/react';

type Inputs = {
	example: string;
	name: string;
};

export default function TravelCreate() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<Box p={4}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={!!errors.example}>
					<FormLabel htmlFor="example">First example</FormLabel>
					<Input
						id="example"
						placeholder="example"
						{...register('example', {
							required: 'This is required',
							minLength: { value: 4, message: 'Minimum length should be 4' },
						})}
					/>
					<FormErrorMessage>{errors.example && errors.example.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.example}>
					<FormLabel htmlFor="name">First name</FormLabel>
					<Input
						id="name"
						placeholder="name"
						{...register('name', {
							required: 'This is required',
							minLength: { value: 4, message: 'Minimum length should be 4' },
						})}
					/>
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				</FormControl>

				<Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
					Submit
				</Button>
			</form>
		</Box>
	);
}
