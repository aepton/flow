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

  const autofocusInput = useCallback((inputElement) => {
    if (inputElement) {
      setTimeout(x => {
        const range = document.createRange();
        range.selectNodeContents(inputElement);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }, 100);
    }
  }, []);

  let className = `argument-node ${data.active ? 'active-node' : ''}`;
  let handleClass = data.editingMode ? 'edit-handle' : 'noedit-handle';

  return (
    <div className={className}>
        {false && <Handle type="target" position={Position.Top} style={{ background: 'black' }} />}
        {data.sourceHandle && <Handle type="source" position={Position.Bottom} className={handleClass} /> }
        {data.targetHandle && <Handle type="target" position={Position.Top} className={handleClass} /> }
        {data.active && data.editingMode &&
          <div>
            <div className="text-entry-node" contentEditable ref={autofocusInput}>
              {data.text}
            </div>
            <Multiselect
              data={data.allTags}
              placeholder="add tags"
              allowCreate
              autoFocus={data.editingMode}
              onChange={onChange}
              value={data.tags}
              onCreate={onCreate}
            />
          </div>
        }
        {(!data.active || !data.editingMode) &&
          <div>
            <div className="argument-text">
              {data.text}
            </div>
            <div className="argument-tags">
              {data.tags.join('; ')}
            </div>
          </div>
        }
    </div>
  );
}

export default ArgumentNode;