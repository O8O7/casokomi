import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useSWR from "swr"
import Link from 'next/link';

import { TableLoading } from '../UIkit';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function BasicTable() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/app/coin_info/`, fetcher)

  if (error) return <TableLoading discription="Failed to load" />
  if (!data) return <TableLoading discription="Loading..." />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell>名前</TableCell>
            <TableCell align='center'>Symbol</TableCell>
            <TableCell align="right">24h変動</TableCell>
            <TableCell align="right">マーケットキャップ</TableCell>
            <TableCell align="right">etc..</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.rank}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='center'>{row.symbol}</TableCell>
              <TableCell align="right">{(Math.floor(row.day_perchange * 100)) / 100}&nbsp;%</TableCell>
              <TableCell align="right">{Math.floor(row.market_cap)}&nbsp;$</TableCell>
              <TableCell align="right"><Link href={`/chat/?room_name=${row.name}`}>参加</Link></TableCell>
              {/* <TableCell align="right"><Link href={`/chat/${row.name}`}><a>参加</a></Link></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}