import { render } from "../../utils/test-utils/test-utils";
import { ModalCreate } from "../Modal/ModalCreate";

describe("ModalCreate", () => {
  it("should render", () => {
    const { getByText } = render(<ModalCreate />);
    expect(getByText("Create a new destination")).toBeInTheDocument();
  });

  it("should render the form", () => {
    const { getByText } = render(<ModalCreate />);
    expect(getByText("Title")).toBeInTheDocument();
  });

  it("should render the form with the data", () => {
    const { getByText } = render(<ModalCreate id="1" />);
    expect(getByText("Title")).toBeInTheDocument();
  });
});
