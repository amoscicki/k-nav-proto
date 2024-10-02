import React from "react";
import { TYPES } from "../ioc/core/types";
import { IValidationService } from "../services/validation/validationService.interface";
import { useInjection } from "@/hooks/use-injection";

interface FormData {
  name: string;
  email: string;
  age: number;
}

export function SomeForm() {
  const validationService = useInjection<IValidationService>(
    TYPES.ValidationService,
  );

  const handleSubmit = async (data: unknown) => {
    const schema = {
      name: validationService.createStringRule(2),
      email: validationService.createEmailRule(),
      age: validationService.createNumberRule(18),
    };

    try {
      const validatedData = await validationService.validateObject(
        schema,
        data,
      );
      // Proceed with valid data
      console.log(validatedData);
    } catch (error) {
      // Handle validation errors
      console.error(error);
    }
  };

  // Rest of the component
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ name: "John", email: "john@example.com", age: 25 });
      }}
    >
      <button type="submit">Submit</button>
    </form>
  );
}
