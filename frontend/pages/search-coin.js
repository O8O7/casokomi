import Head from "next/head";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableLoading } from "../components/UIkit";
import useSWR from "swr";
import Container from "@mui/material/Container";
import Link from "next/link";

export default function SearchCoin() {
  const router = useRouter();
  const { keyword } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/app/coin_info/?coin_name=${keyword}`,
    fetcher
  );
  if (error) return <TableLoading discription="Failed to load" />;
  if (!data) return <TableLoading discription="Loading..." />;

  return (
    <>
      <Head>
        <title>FullStackChannel | プロフィール</title>
      </Head>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell>名前</TableCell>
                <TableCell align="center">Symbol</TableCell>
                <TableCell align="right">24h変動</TableCell>
                <TableCell align="right">マーケットキャップ</TableCell>
                <TableCell align="right">etc..</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.rank}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{row.symbol}</TableCell>
                  <TableCell align="right">
                    {Math.floor(row.day_perchange * 100) / 100}&nbsp;%
                  </TableCell>
                  <TableCell align="right">
                    {Math.floor(row.market_cap)}&nbsp;$
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/chat/?room_name=${row.name}`}>参加</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
