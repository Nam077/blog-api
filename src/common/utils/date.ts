import { fromUnixTime } from 'date-fns';

export const convertTimestampToDate = (timestamp: number) => {
    return fromUnixTime(timestamp);
};
