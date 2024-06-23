import { Link, useParams } from 'react-router-dom';

export const Nav = ({ topicList, setSortBy, setOrder }) => {
  const { topic } = useParams();

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <nav>
      <ul id="topic-list">
        {topicList.map((oneTopic) => {
          return (
            <li className="topic" key={oneTopic.slug}>
              <Link
                to={`/nc-news/topics/${oneTopic.slug}`}
                style={oneTopic.slug === topic ? { color: '#b80000' } : null}
              >
                {oneTopic.slug}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul id="option-list">
        <li>
          <form>
            <label>
              Sort by:{' '}
              <select onChange={handleSortByChange}>
                <option value="created_at">Date</option>
                <option value="comment_count">Comment count</option>
                <option value="votes">Votes</option>
                <option value="title">Title</option>
              </select>
            </label>
          </form>
        </li>
        <li>
          <form>
            <label>
              Order:{' '}
              <select onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </form>
        </li>
      </ul>
    </nav>
  );
};
