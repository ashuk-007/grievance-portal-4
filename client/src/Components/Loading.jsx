import React from 'react'

export default function Loading() {
  return (
    <div className={"fixed top-0 left-0 right-0 bottom-0 bg-gray-200 flex justify-center items-center"}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
}
