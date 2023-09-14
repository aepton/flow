import { useCallback } from 'react';

function HighlightedCardNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="highlighted-card-node" style="background: red" />
  );
}

export default HighlightedCardNode;