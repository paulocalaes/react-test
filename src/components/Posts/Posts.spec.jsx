import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = {
  posts: [
    {
      id: 1,
      title: "Title 1",
      body: "body 1",
      cover: "image1.img",
    },
    {
      id: 2,
      title: "Title 2",
      body: "body 2",
      cover: "image2.img",
    },
    {
      id: 3,
      title: "Title 3",
      body: "body 3",
      cover: "image3.img",
    },
  ],
};
describe("<Posts />", () => {
  it("should render posts", () => {
    render(<Posts {...props} />);
    expect(screen.getAllByRole("heading", { name: /Title/i })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: /Title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
  });
  it("should match snapshot", () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
