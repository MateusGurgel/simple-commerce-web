"use client";

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import ShippingForm from "../components/shippingForm";
import CheckoutLoginForm from "../components/checkoutLoginForm";

export default function Home() {
  const steps = [
    { title: "Log in", description: "login" },
    { title: "Shipping", description: "Address" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  function getStepComponent(step: number) {
    switch (step) {
      case 1:
        return (
          <CheckoutLoginForm
            setNextStep={() => setActiveStep(activeStep + 1)}
          />
        );

      case 2:
        return (
          <ShippingForm setNextStep={() => setActiveStep(activeStep + 1)} />
        );

      case 3:
        break;

      default:
        return null;
    }
  }

  return (
    <VStack px="10%" py={20} gap={10}>
      <Stepper colorScheme="blackAlpha" index={activeStep} border={"1px"} p={4}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {getStepComponent(activeStep)}
    </VStack>
  );
}