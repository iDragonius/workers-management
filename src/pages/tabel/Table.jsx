import React, { useRef } from 'react'
import { downloadExcel } from 'react-export-table-to-excel'
import { nanoid } from 'nanoid'
const Table = ({ data, rows, name }) => {
    const tableRef = useRef()
    const download = () => {
        downloadExcel({
            fileName: name + '-' + nanoid(),
            sheet: name,
            tablePayload: {
                header: rows,
                body: data,
            },
        })
    }
    return (
        <>
            <button
                onClick={download}
                className={
                    'py-2 px-4 text-white bg-primary w-max mt-10 text-lg rounded-md'
                }
            >
                Export to Excel and Download
            </button>
            <div
                className={
                    'overflow-x-auto my-10 max-w-[1400px] max-h-[600px] rounded-xl'
                }
            >
                <table className={'border  rounded-xl '} ref={tableRef}>
                    <tbody>
                        <tr className={'bg-primary  text-white sticky top-0 '}>
                            {rows.map((row) => (
                                <th className={'px-10  py-3'}>{row}</th>
                            ))}
                        </tr>
                        {data.map((row) => (
                            <tr
                                className={
                                    ' text-center odd:bg-white even:bg-slate-50'
                                }
                            >
                                {row.map((rowData) => (
                                    <td className={'py-5'}>{rowData}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
