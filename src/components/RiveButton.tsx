import { Box, Heading, Link } from "@chakra-ui/react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useCallback } from "react";

export default function RiveButton() {
	const { rive, RiveComponent } = useRive({
		src: "/hero_use_case.riv",
		artboard: "Button",
		stateMachines: "State Machine 1",
		autoplay: true,
		shouldDisableRiveListeners: true,
	});

	const isHoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");

	const onButtonActivate = useCallback(() => {
		if (rive && isHoverInput) {
			isHoverInput.value = true;
		}
	}, [rive, isHoverInput]);

	const onButtonDeactivate = useCallback(() => {
		if (rive && isHoverInput) {
			isHoverInput.value = false;
		}
	}, [rive, isHoverInput]);

	return (
		<Box
			position="absolute"
			top="50%"
			left="50%"
			transform="translateX(-50%) translateY(-50%)"
			textAlign="center"
		>
			<Heading
				as="h1"
				color="white"
				fontSize={{
					base: "4xl",
					lg: "5xl",
				}}
				pb="2"
				style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)" }}
			>
				Explore
			</Heading>
			<Box position="relative" pt="37.88%" mx="auto" className="rive-button-container">
				<Box position="absolute" top="0" left="0" bottom="0" right="0">
					<Link
						position="absolute"
						top={0}
						left={0}
						right={0}
						bottom={0}
						display="flex"
						alignItems="center"
						justifyContent="center"
						rel="noopener noreferrer"
						target="_blank"
						href="https://rive.app"
						aria-label="Start now; explore the Rive.app homepage"
						w="100%"
						h="100%"
						background="transparent"
						color="white"
						fontSize={{
							base: "sm",
							lg: "lg",
						}}
						style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)" }}
						onMouseEnter={onButtonActivate}
						onMouseLeave={onButtonDeactivate}
						onFocus={onButtonActivate}
						onBlur={onButtonDeactivate}
					>
						START NOW
					</Link>
					<RiveComponent aria-hidden="true" />
				</Box>
			</Box>
		</Box>
	);
}
