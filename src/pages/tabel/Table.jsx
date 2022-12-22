import React, { useEffect, useState } from 'react'

const Table = ({ data, rows }) => {
    return (
        <div
            className={
                'overflow-x-auto my-10 max-w-screen max-h-[600px] rounded-xl'
            }
        >
            <table className={'border  rounded-xl '}>
                <thead className={'sticky top-0   '}>
                    <tr className={'bg-primary  text-white'}>
                        {rows.map((row) => (
                            <th className={'px-10  py-3'}>{row}</th>
                        ))}
                    </tr>
                </thead>
                {data.map((row) => (
                    <tr
                        className={' text-center odd:bg-white even:bg-slate-50'}
                    >
                        {row.map((rowData) => (
                            <td className={'py-5'}>{rowData}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Table
