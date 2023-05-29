import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps {
  OnClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

export default function Button({ OnClick, children, disabled }: ButtonProps) {
  return (
    <Box
      onClick={OnClick}
      as="button"
      disabled={disabled}
      height="50px"
      width="100%"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      lineHeight="1.2"
      border="1px"
      px="8px"
      borderRadius="2px"
      fontSize="14px"
      fontWeight="semibold"
      borderColor="#000"
      color="#4b4f56"
      _hover={{ bg: "#000", textColor: "white" }}
    >
      {children}
    </Box>
  );
}
