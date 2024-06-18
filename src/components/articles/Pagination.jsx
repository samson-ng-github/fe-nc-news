export const Pagination = (props) => {
  const {
    currentPage,
    articlePerPage,
    articleListLength,
    handleNext,
    handlePrevious,
  } = props;
  return (
    <section id="pagination">
      <button
        onClick={handlePrevious}
        className={
          currentPage === 1 ? 'pagination-button-disabled' : 'pagination-button'
        }
      >
        Previous
      </button>
      Page {currentPage} of {Math.ceil(articleListLength / articlePerPage)}
      <button
        onClick={handleNext}
        className={
          currentPage === Math.ceil(articleListLength / articlePerPage)
            ? 'pagination-button-disabled'
            : 'pagination-button'
        }
      >
        Next
      </button>
    </section>
  );
};
