import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mx-auto mt-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        variant={"outline"}
        size={"sm"}
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        variant={"outline"}
        size={"sm"}
        className="ml-2"
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
