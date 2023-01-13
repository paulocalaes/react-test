import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardMock } from "./mock";

const props = postCardMock;

describe("<Postcard />", () => {
  it("should render Postcard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: "title" })).toHaveAttribute(
      "src",
      "text"
    );

    expect(
      screen.getByRole("heading", { name: "title 1" })
    ).toBeInTheDocument();

    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
