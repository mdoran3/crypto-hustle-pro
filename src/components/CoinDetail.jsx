import { useEffect, useState } from "react"
import { useParams } from "react-router"
import CoinChart from "./CoinChart"
const API_KEY = import.meta.env.VITE_APP_API_KEY

// Adds thousands separators; keeps extra decimals for sub-$1 values
const formatNumber = (n) =>
    n == null
        ? "not listed"
        : n.toLocaleString("en-US", { maximumFractionDigits: Math.abs(n) >= 1 ? 2 : 8 })

const CoinDetail = () => {

    const { id } = useParams()
    const [coin, setCoin] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        const getCoinDetail = async () => {
          try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}`,
                {
                    headers: {
                        "x-cg-demo-api-key": API_KEY,
                    },
                    signal: controller.signal,
                }   
            )
            const json = await response.json()
            setCoin(json)
            }
            catch (error) {
              if (error.name === "AbortError") {
                // It's ok, don't do anything
              } else {
                console.error(error)
              }
            }
            }
        getCoinDetail().catch(console.error)
        return () => controller.abort()
    }, [id])

    return (
        <div className="coin-detail">
            <h1>{coin?.name}</h1>
            <img
              className="images"
              src={coin?.image?.large}
              alt={`Small icon for ${coin?.name} crypto coin`}
            />
            <div> {coin?.description?.en}</div>
            <br></br>
            <div>
              This coin was built with the algorithm{" "}
              {coin?.hashing_algorithm ?? "not listed"}{" "}
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Launch Date </th>
                  <td> {coin?.genesis_date ?? "not listed"} </td>
                </tr>
                <tr>
                  <th>Website </th>
                  <td> <a href={coin?.links?.homepage?.[0]} target="_blank" rel="noopener noreferrer">{coin?.links?.homepage?.[0] ?? "not listed"}</a> </td>
                </tr>
                <tr>
                  <th>Whitepaper </th>
                  <td> <a href={coin?.links?.official_forum_url?.[0]} target="_blank" rel="noopener noreferrer">{coin?.links?.official_forum_url?.[0] ?? "not listed"}</a> </td>
                </tr>
                <tr>
                  <th>Monetary Symbol </th>
                  <td> {coin?.symbol ?? "not listed"} </td>
                </tr>
                <tr>
                  <th>Market Cap Rank </th>
                  <td> {coin?.market_cap_rank ?? "not listed"} </td>
                </tr>
                <tr>
                  <th>Last Updated </th>
                  <td> {coin?.last_updated ?? "not listed"} </td>
                </tr>
                <tr>
                  <th>Circulating Supply </th>
                  <td> {formatNumber(coin?.market_data?.circulating_supply)} </td>
                </tr>
                <tr>
                  <th>Volume </th>
                  <td> {formatNumber(coin?.market_data?.total_volume?.usd)} </td>
                </tr>
                <tr>
                  <th>Current Price </th>
                  <td> {formatNumber(coin?.market_data?.current_price?.usd)} </td>
                </tr>
                <tr>
                  <th>Highest Price (24h) </th>
                  <td> {formatNumber(coin?.market_data?.high_24h?.usd)} </td>
                </tr>
                <tr>
                  <th>Lowest Price (24h) </th>
                  <td> {formatNumber(coin?.market_data?.low_24h?.usd)} </td>
                </tr>
                <tr>
                  <th>Change from Previous Day </th>
                  <td> {formatNumber(coin?.market_data?.price_change_24h)} </td>
                </tr>
                <tr>
                  <th>Market Cap </th>
                  <td> {formatNumber(coin?.market_data?.market_cap?.usd)} </td>
                </tr>
              </tbody>
            </table>
            <CoinChart id={id} />
        </div>
    )
}

export default CoinDetail

