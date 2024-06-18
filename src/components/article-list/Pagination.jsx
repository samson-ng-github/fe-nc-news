export const Pagination = (props) => {
  const { currentPage, articleList, setCurrentPage, setArticlesOnThisPage } =
    props;

  const articlePerPage = 10;

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setArticlesOnThisPage(
      articleList.slice(
        currentPage * articlePerPage,
        (currentPage + 1) * articlePerPage
      )
    );
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    setArticlesOnThisPage(
      articleList.slice(
        (currentPage - 2) * articlePerPage,
        (currentPage - 1) * articlePerPage
      )
    );
  };

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
