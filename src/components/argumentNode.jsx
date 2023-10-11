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
  let handleClass = data.editingMode ? 'edit-handle' : 'noedit-handle';

  return (
    <div className={className}>
        {false && <Handle type="target" position={Position.Top} style={{ background: 'black' }} />}
        {data.sourceHandle && <Handle type="source" position={Position.Bottom} className={handleClass} /> }
        {data.targetHandle && <Handle type="target" position={Position.Top} className={handleClass} /> }
        <div className="argument-text">
          {data.text}
        </div>
        {data.active &&
          <Multiselect
            data={data.allTags}
            placeholder="add tags"
            allowCreate
            autoFocus={data.editingMode}
            onChange={onChange}
            value={data.tags}
            onCreate={onCreate}
          />
        }
    </div>
  );
}

export default ArgumentNode;