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
import ShippingForm from "../components/checkout/shippingForm";
import CheckoutPaymentOptionsForm from "../components/checkout/paymentOptionsForm";
import CheckoutLoginForm from "../components/checkout/LoginForm";
import CheckoutPlaceOrder from "../components/checkout/placeOrder";

export default function Home() {
  const steps = [
    { title: "Log in", description: "login" },
    { title: "Shipping", description: "Address" },
    { title: "Payment", description: "payment info" },
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
        return (
          <CheckoutPaymentOptionsForm
            setNextStep={() => setActiveStep(activeStep + 1)}
          />
        );

      case 4:
        return <CheckoutPlaceOrder />;

      default:
        return null;
    }
  }

  return (
    <VStack px="10%" py={20} gap={10}>
      <Stepper colorScheme="blackAlpha" index={activeStep} p={4}>
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
