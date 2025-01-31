import { useCallback } from "react";

function SpeechLabelNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="speech-label-node">
      {data.isEditing ? "HHH" : ""}
      {data.label}
    </div>
  );
}

export default SpeechLabelNode;
