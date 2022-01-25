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
import Button from "@mui/material/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

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
                <TableCell style={{ padding: "16px 0 16px 16px" }}>
                  名前
                </TableCell>
                <TableCell style={{ padding: 0 }} align="center">
                  チャット
                </TableCell>
                <TableCell align="center">Symbol</TableCell>
                <TableCell align="center">24h変動</TableCell>
                <TableCell align="center">マーケットキャップ</TableCell>
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
                  <TableCell style={{ padding: "16px 0 16px 16px" }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    <Link href={`/chat/?room_name=${row.symbol}`}>
                      <Button
                        color="info"
                        size="small"
                        variant="contained"
                        endIcon={<ArrowCircleRightIcon />}
                      >
                        参加
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.symbol}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {row.day_perchange > 0 ? (
                        <>
                          <KeyboardDoubleArrowUpIcon
                            style={{ color: "green" }}
                          />
                          <span>
                            {Math.floor(row.day_perchange * 100) / 100}&nbsp;%
                          </span>
                        </>
                      ) : (
                        <>
                          <KeyboardDoubleArrowDownIcon
                            style={{ color: "red" }}
                          />
                          {Math.floor(row.day_perchange * 100) / 100}&nbsp;%
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {Math.floor(row.market_cap)}&nbsp;$
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
