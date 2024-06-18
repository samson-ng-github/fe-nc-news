import { Link } from 'react-router-dom';

export const Nav = ({ topicList }) => {
  return (
    <nav>
      {topicList.map((topic) => {
        return (
          <Link to={`/${topic.slug}`} className="topic" key={topic.slug}>
            {topic.slug}
          </Link>
        );
      })}
    </nav>
  );
};
