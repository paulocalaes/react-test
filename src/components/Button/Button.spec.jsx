import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";
describe("<Button />", () => {
  const fn = jest.fn();
  it("should render the button with the text", () => {
    expect.assertions(1);
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<Button text="Load more" onClick={fn} disabled={true} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled is false", () => {
    render(<Button text="Load more" onClick={fn} disabled={false} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Button text="Load more" onClick={fn} disabled={true} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
