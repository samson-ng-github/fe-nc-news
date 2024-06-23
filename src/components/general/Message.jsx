export const Message = ({ message, style }) => {
  return (
    <h2
      style={style === 'no-margin' ? { marginLeft: '0' } : {}}
      className="message"
    >
      {message}
    </h2>
  );
};
