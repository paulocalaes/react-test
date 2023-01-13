import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title 1",
          body: "body 1",
          url: "image1",
        },
        {
          userId: 1,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "image2",
        },
        {
          userId: 1,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "image3",
        },
      ])
    );
  }),
];
const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("shoul render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    const button = screen.getByRole("button", { name: /Load More posts/i });
    expect(button).toBeInTheDocument();
  });
  it("shoul search for posts ", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    expect.assertions(11);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /title 2/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /title 3/i })
    ).not.toBeInTheDocument();

    userEvent.type(search, "title 1");
    expect(
      screen.getByRole("heading", { name: /title 1 1/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /title 2/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /title 3/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Search value: title 1" })
    ).toBeInTheDocument();

    userEvent.clear(search);
    expect(
      screen.getByRole("heading", { name: /title 1 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /title 2/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /title 3/i })
    ).not.toBeInTheDocument();

    userEvent.type(search, "blabla");
    expect(screen.getByText("Não existem posts")).toBeInTheDocument();
  });

  it("shoul load more posts ", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    // expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole("button", { name: /load more posts/i });
    userEvent.click(button);
    expect(
      screen.getByRole("heading", { name: /title 3 3/i })
    ).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
