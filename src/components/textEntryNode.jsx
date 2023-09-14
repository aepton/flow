import { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { addCard } from "../slices/flowSlice";


function TextEntryNode({ data }) {
  const dispatch = useDispatch();
  const speechId = useSelector((state) => state.flow.speechId);
  
  const onChange = useCallback((event) => {
    console.log(event.target.value);
    if (event.target.value.includes("\n")) {
      const val = event.target.value.replace("\n", "");
      if (val != "") {
        console.log("adding", val);
        dispatch(addCard({card: event.target.value, speechId }));
      }
    }
  }, []);
  
  const autofocusInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div className="text-entry-node">
      <div>
        <p>New card</p>
        <textarea id="text-entry" name="text" onChange={onChange} ref={autofocusInput} />
      </div>
    </div>
  );
}

export default TextEntryNode;
