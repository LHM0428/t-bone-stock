import axios from 'axios';

export const getLastFourQuaterConsensus = () => axios.get('/consensus/lastFourQuater');
