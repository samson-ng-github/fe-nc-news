export const Pagination = (props) => {
  const {
    currentPage,
    articlePerPage,
    articleList,
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
      Page {currentPage} of {Math.ceil(articleList.length / articlePerPage)}
      <button
        onClick={handleNext}
        className={
          currentPage === Math.ceil(articleList.length / articlePerPage)
            ? 'pagination-button-disabled'
            : 'pagination-button'
        }
      >
        Next
      </button>
    </section>
  );
};
