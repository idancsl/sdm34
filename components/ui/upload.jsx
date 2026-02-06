"use client";

import { useState, useCallback } from "react";

const Upload = ({ label, onFileChange }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setFileName(file.name);
      onFileChange(file);
    },
    [onFileChange]
  );

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
      <p className="font-semibold mb-2">{label}</p>
      <label className="cursor-pointer flex flex-col items-center justify-center text-gray-500">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
        />
        <div className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded-lg text-sm font-medium">
          {fileName || `Upload ${label}`}
        </div>
      </label>
    </div>
  );
};

export default Upload;
