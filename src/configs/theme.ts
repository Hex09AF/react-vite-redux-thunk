import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Input = defineStyleConfig({
	baseStyle: {
		field: {
			_placeholder: {
				fontSize: "sm",
				color: "gray.400",
			},
		},
	},
	sizes: {
		lg: {},
	},
	variants: {},
	defaultProps: {
		size: "lg",
	},
});

const theme = extendTheme({
	components: {
		Input,
	},
});

export default theme;
