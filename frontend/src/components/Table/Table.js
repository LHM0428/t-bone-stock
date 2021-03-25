import React from 'react';

const Table = () => {
  return (
    <table className="text-left w-full border-collapse border">
      <thead>
        <tr>
          <th className="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b bg-grey-400">City</th>
          <th className="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b bg-grey-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-grey-300">
          <td className="py-4 px-6 border-b bg-grey-400">New York</td>
          <td className="py-4 px-6 border-b bg-grey-400">
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-300 hover:bg-green-500">Edit</a>
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-300 hover:bg-blue-500">View</a>
          </td>
        </tr>
        <tr className="hover:bg-grey-300">
          <td className="py-4 px-6 border-b bg-grey-400">Paris</td>
          <td className="py-4 px-6 border-b bg-grey-400">
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-300 hover:bg-green-500">Edit</a>
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-300 hover:bg-blue-500">View</a>
          </td>
        </tr>
        <tr className="hover:bg-grey-300">
          <td className="py-4 px-6 border-b bg-grey-400">London</td>
          <td className="py-4 px-6 border-b bg-grey-400">
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-300 hover:bg-green-500">Edit</a>
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-300 hover:bg-blue-500">View</a>
          </td>
        </tr>
        <tr className="hover:bg-grey-300">
          <td className="py-4 px-6 border-b bg-grey-400">Oslo</td>
          <td className="py-4 px-6 border-b bg-grey-400">
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-300 hover:bg-green-500">Edit</a>
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-300 hover:bg-blue-500">View</a>
          </td>
        </tr>
        <tr className="hover:bg-grey-300">
          <td className="py-4 px-6 border-b bg-grey-400">Mexico City</td>
          <td className="py-4 px-6 border-b bg-grey-400">
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-300 hover:bg-green-500">Edit</a>
            <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-300 hover:bg-blue-500">View</a>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table;