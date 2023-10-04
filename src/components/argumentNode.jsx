import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Multiselect from "react-widgets/Multiselect";

function ArgumentNode({ data }) {
  const onChange = useCallback((value, event) => {
    console.log('change', value, event);
    if (event.action == 'remove') {
      data.removeTag(event.dataItem);
    } else if (event.action == 'insert') {
      data.addTag(event.dataItem);
    }
  });

  const onCreate = useCallback(tag => {
    data.createTag(tag);
    data.addTag(tag);
  });

  let className = `argument-node ${data.active ? 'active-node' : ''}`;

  return (
    <div className={className}>
        {false && <Handle type="target" position={Position.Top} style={{ background: 'black' }} />}
        {data.sourceHandle && <Handle type="source" position={Position.Bottom} /> }
        {data.targetHandle && <Handle type="target" position={Position.Top} /> }
        <div className="argument-text">
          {data.text}
        </div>
        {data.active &&
          <Multiselect
            data={data.allTags}
            placeholder="add tags"
            allowCreate
            autoFocus
            onChange={onChange}
            value={data.tags}
            onCreate={onCreate}
          />
        }
    </div>
  );
}

export default ArgumentNode;