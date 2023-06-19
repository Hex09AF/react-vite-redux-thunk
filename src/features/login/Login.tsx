import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Heading,
	Img,
	Input,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, Link as RouterLink, useLocation } from "react-router-dom";
import appleLogo from "../../assets/apple.svg";
import facebookLogo from "../../assets/facebook.svg";
import googleLogo from "../../assets/google.svg";
import loginGo from "../../assets/login-go.png";
import { toastError } from "../../helpers/errorHandling";
import { useAuth } from "../../hooks/useAuth";
import { useLoginMutation } from "../../services/auth";

type Inputs = {
	email: string;
	password: string;
};

function LoginFrame() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const [login] = useLoginMutation();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			await login(data).unwrap();
		} catch (err) {
			toastError(err);
		}
	};

	return (
		<Card w="100%" maxW="md" alignSelf="center" m="auto" borderRadius="3xl" boxShadow="2xl">
			<CardBody>
				<Flex justify="space-between">
					<Box>
						Welcome to{" "}
						<Text as="strong" textTransform="uppercase" color="blue.400">
							Lorem
						</Text>
					</Box>
					<Box as="small">
						<Text color="gray.500">No account ?</Text>
						<Link color="blue.400" display="block" as={RouterLink} to="/signup">
							Sign up
						</Link>
					</Box>
				</Flex>

				<Heading as="h1" mb="12">
					Sign in
				</Heading>

				<Flex gap={4} mb={8}>
					<Button flex={1} fontWeight="normal" color="blue.400">
						<Img mr={2} src={googleLogo} alt="google logo" width={26} height={26} />

						<Text>Sign in</Text>
						<Text ml={1} display={{ base: "none", sm: "inline" }}>
							with Google
						</Text>
					</Button>

					<Button>
						<Img src={facebookLogo} alt="facebook logo" width={26} height={26} />
					</Button>
					<Button>
						<Img src={appleLogo} alt="apple logo" width={26} height={26} />
					</Button>
				</Flex>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl mb={8} isInvalid={!!errors.email}>
						<FormLabel htmlFor="email">Enter your Email address</FormLabel>
						<Input
							id="email"
							placeholder="Email address"
							{...register("email", {
								required: "This is required",
								minLength: { value: 4, message: "Minimum length should be 4" },
							})}
						/>
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>

					<FormControl mb={3} isInvalid={!!errors.password}>
						<FormLabel htmlFor="password">Enter your Password</FormLabel>
						<Input
							id="password"
							placeholder="Password"
							{...register("password", {
								required: "This is required",
								minLength: { value: 4, message: "Minimum length should be 4" },
							})}
						/>
						<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
					</FormControl>

					<Stack>
						<Link
							mb={8}
							alignSelf="flex-end"
							fontSize="sm"
							as={RouterLink}
							to="/forgot"
							color={"blue.400"}
						>
							Forgot password?
						</Link>

						<Button
							fontSize="md"
							shadow="lg"
							color="white"
							fontWeight="normal"
							size="lg"
							colorScheme="blue"
							backgroundColor="blue.400"
							isLoading={isSubmitting}
							loadingText="Submitting"
							type="submit"
						>
							Sign in
						</Button>
					</Stack>
				</form>
			</CardBody>
		</Card>
	);
}

export default function Login() {
	const user = useAuth();
	const location = useLocation();

	if (user.user) return <Navigate to="/" state={{ from: location }} />;

	return (
		<>
			<Grid templateRows="repeat(2, 1fr)" position="absolute" w="100%" h="100%" zIndex={-10}>
				<Box h="100%" bg="blue.400" />
			</Grid>

			<Grid
				gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
				p={{ base: 4, sm: 0 }}
				h="100%"
			>
				<Grid
					templateRows="repeat(2, 1fr)"
					h="100%"
					overflow="hidden"
					display={{ base: "none", md: "grid" }}
					position="relative"
				>
					<Flex className="flex">
						<Box p={14} pr={2} alignSelf="center" maxW="65%" color="white">
							<Heading as="h2" fontWeight="semibold">
								Sign in to
							</Heading>
							<Heading mt={2} fontSize="xl" as="h3" fontWeight="medium">
								Lorem Ipsum is simply
							</Heading>
							<Text as="p" fontWeight="normal" mt={4}>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
								Ipsum has been the industry's standard dummy text ever since the 1500s
							</Text>
						</Box>
						<Flex align="middle" alignItems="middle" right="-5%" zIndex={-10}>
							<Img height={300} width={300} objectFit="contain" alt="login go" src={loginGo} />
						</Flex>
					</Flex>
				</Grid>

				<LoginFrame />
			</Grid>
		</>
	);
}
