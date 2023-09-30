import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function BasicCardNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="basic-card-node" style={{border: "green"}}>
      <Handle type="target" position={Position.Top} />
      {data}
    </div>
  );
}

export default BasicCardNode;