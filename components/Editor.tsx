"use client";

import { updateEntry } from "@/app/api/_utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoad, setIsLoad] = useState(false);
  useAutosave({
    data: value,
    onSave: async (newValue) => {
      setIsLoad(true);
      const updated = await updateEntry(entry.id, newValue);
      setIsLoad(false);
    },
    interval: 10000,
  });

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full bg-transparent p-8 text-lg outline-none"
        rows={15}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      {isLoad && (
        <div className="flex w-full h-full justify-end">... 💾 saving</div>
      )}
    </div>
  );
};

export default Editor;
