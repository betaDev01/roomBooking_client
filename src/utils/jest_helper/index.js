import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";


export const toBeInTheDocument = text => {
  const element = screen.getByText(text);

  if (element) {
    expect(element).toBeInTheDocument();
  } else {
    throw new Error(`${text} not found in the DOM.`);
  }
};

export const fireEventClick = ({ action, errorText }) => {
  if (action) {
    fireEvent.click(action);
  } else {
    throw new Error(`${errorText} button not found in the DOM.`);
  }
};