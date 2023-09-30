import { useCallback } from 'react';

function HighlightedCardNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="highlighted-card-node" style="border: red" />
  );
}

export default HighlightedCardNode;