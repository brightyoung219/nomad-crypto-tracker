import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { DotPulse } from '@uiball/loaders'


const Container = styled.div`
  padding: 60px 20px;
  max-width: 480px;
  margin: 0 auto;
  `;

const Header = styled.header`
  height: 14vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 800;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${ props => props.theme.bgColor };
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding : 20px;
    transition: color .2s ease-in;
    display: flex;
    align-items: center;
  };
  &:hover {
    a {
      color : ${ props => props.theme.accentColor }
    }
  }
`;

 export const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {

  // const [ coins, setCoins ] = useState<ICoin[]>([]);
  // const [ loading, setLoading ] = useState(true);

  // useEffect( ()=>{
  //   ( async () => {
  //       const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //       const json = await response.json();
  //       setCoins(json.slice(0,100));
  //       setLoading(false);
  //   } )();
  // }, []);

  const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins);


  return (
    <Container>
      <Helmet>
        <title>coin</title>
      </Helmet>
      <Header>
        <Title>Coins Tracker</Title>
      </Header>
      {isLoading ? (
        <Loader>
          <DotPulse size={40} speed={1.3} color="white" />
        </Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;