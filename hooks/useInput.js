'use client'

import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [edited, setEdited] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setEdited(false);
  }

  function handleInputBlur() {
    setEdited(true);
  }

  return {
    value: enteredValue, 
    handleInputChange,
    handleInputBlur,
    hasError: edited && !valueIsValid
  };
}
