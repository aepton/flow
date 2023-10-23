import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Multiselect from "react-widgets/Multiselect";

import { useDispatch } from "react-redux";

import { addCardAfter, removeCard, setSelectedNode } from "../slices/flowSlice";

import minusUrl from "../../minus.svg";
import plusUrl from "../../plus.svg";
import trashUrl from "../../trash.svg";


function ArgumentNode({ data }) {
  const dispatch = useDispatch();

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

  const deleteNode = () => {
    dispatch(removeCard(data.id));
  }

  const addNode = () => {
    dispatch(addCardAfter(data.id));
  }

  const onClick = () => {
    dispatch(setSelectedNode(data.nodeIdx));
    dispatch(setStatus('node'));
  }

  const collapseExchange = () => {
    console.log('collapse exchange');
  }

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
        {data.editingMode &&
          <div>
            <img src={trashUrl} className="delete-node" onClick={deleteNode} />
            <img src={plusUrl} className="add-node" onClick={addNode} />
          </div>
        }
        {!data.editingMode && data.clusterHead &&
          <img src={minusUrl} className="collapse-exchange" onClick={collapseExchange} />
        }
        {data.active && data.editingMode &&
          <div>
            <div className="text-entry-node" contentEditable ref={autofocusInput} onClick={onClick}>
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
            <div
              className="argument-text"
              dangerouslySetInnerHTML={{__html: window.showdown.makeHtml(data.text)}}
              onClick={onClick}
            />
            {data.clusterHead &&
              <div className="argument-tags">
                {data.tags.join('; ')}
              </div>
            }
          </div>
        }
    </div>
  );
}

export default ArgumentNode;