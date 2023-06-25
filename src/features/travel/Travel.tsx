import { Link as RouterLink } from "react-router-dom";
import { Travel, useGetTravelQuery } from "../../services/travel";

import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	Heading,
	Img,
	Link,
	Portal,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

function PostCard({ data }: { data: Travel }) {
	return (
		<Box py={6}>
			<Box
				w="xs"
				rounded={"sm"}
				my={5}
				mx={[0, 5]}
				overflow={"hidden"}
				bg="white"
				border={"1px"}
				borderColor="black"
				boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
			>
				<Box h={"200px"} borderBottom={"1px"} borderColor="black">
					<Img
						src={
							data.url ||
							"https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
						}
						roundedTop={"sm"}
						objectFit="cover"
						h="full"
						w="full"
						alt={"Blog Image"}
					/>
				</Box>
				<Box p={4}>
					<Box bg="black" display={"inline-block"} px={2} py={1} color="white" mb={2}>
						<Text fontSize={"xs"} fontWeight="medium">
							React
						</Text>
					</Box>
					<Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
						{data.title}
					</Heading>
					<Text color={"gray.500"} noOfLines={2}>
						{data.content}
					</Text>
				</Box>
				<HStack borderTop={"1px"} color="black">
					<Flex
						p={4}
						alignItems="center"
						justifyContent={"space-between"}
						roundedBottom={"sm"}
						cursor={"pointer"}
						w="full"
					>
						<Text fontSize={"md"} fontWeight={"semibold"}>
							View more
						</Text>
						<Text fontSize={"md"} fontWeight={"semibold"}>
							<Link as={RouterLink} to={`/travel/${data.id}/edit`}>
								Edit
							</Link>
						</Text>
					</Flex>
				</HStack>
			</Box>
		</Box>
	);
}

export default function PostWithLike() {
	const { data } = useGetTravelQuery();

	return (
		<Container maxW="container.xl">
			<Flex>
				{data?.map((v) => (
					<PostCard key={v.id} data={v} />
				))}
			</Flex>
			<Portal>
				<Box position="fixed" bottom={0} right={0}>
					<Button m={4} bg="blue.400" color="white" colorScheme="blue">
						<Link as={RouterLink} to="/travel/create">
							Make
						</Link>
					</Button>
				</Box>
			</Portal>
		</Container>
	);
}
