import { mockData } from "../../utils/test-utils/mockData";
import { fireEvent, render, screen } from "../../utils/test-utils/test-utils";
import { TabContainer } from "../Tabs/TabContainer";

describe("TabContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <TabContainer
        isLoading={false}
        data={mockData}
      />
    );
  });

  it("renders the TabContainer component with loading state", () => {
    render(
      <TabContainer
        isLoading={true}
        data={[]}
      />
    );

    const skeleton = screen.getAllByTestId("card-skeleton");
    expect(skeleton).toHaveLength(3); // Amount of skeletons
  });

  it("renders the Search bar", () => {
    // Search bar
    expect(screen.getByText("The places you dream of")).toBeInTheDocument();
    expect(screen.getByText("Let's live new adventures")).toBeInTheDocument();
  });
  it("renders the tabs and change on click", () => {
    // Tabs

    const all = screen.getByText("All");
    expect(all).toBeInTheDocument();

    const upcoming = screen.getByText(/upcoming/i);
    expect(all).toBeInTheDocument();

    const completed = screen.getByText(/completed/i);
    expect(all).toBeInTheDocument();

    expect(all).toBeInTheDocument();
    expect(upcoming).toBeInTheDocument();
    expect(completed).toBeInTheDocument();

    fireEvent.click(upcoming);

    const hawaii = screen.getByText(/embark on a tropical escapade to hawaii/i);
    expect(hawaii).toBeInTheDocument();

    // Should not render completed destination like Slovenia
    const slovenia = screen.queryByText(/journey to slovenia/i);
    expect(slovenia).not.toBeInTheDocument();

    // Should render Slovenia in completed Tab
    fireEvent.click(completed);
    const slovenia2 = screen.queryByText(/journey to slovenia/i);

    expect(slovenia2).toBeInTheDocument();
  });
});
