import { useCallback } from 'react';

function BasicCardNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="basic-card-node" style={{color: "red"}}>{data}</div>
  );
}

export default BasicCardNode;