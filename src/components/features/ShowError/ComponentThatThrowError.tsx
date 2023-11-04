function ComponentThatThrowError() {
  const getError = () => {
    throw new Error('Oops! Our Death Star just exploded...');
  };

  return <div>{getError()}</div>;
}

export default ComponentThatThrowError;
