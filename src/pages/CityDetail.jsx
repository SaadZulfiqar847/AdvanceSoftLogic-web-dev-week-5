import { useParams } from 'react-router-dom';

function CityDetail() {
  const { cityName } = useParams();
  return <h1>City Detail — {cityName}</h1>;
}

export default CityDetail;