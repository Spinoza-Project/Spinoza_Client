export interface MyPlantFeedType {
  plantName: string;
  farmName: string;
  farmAddress: string;
  weather: string;
  temperature: number;
  humidity: number;
  feeds: FeedType[];
}

export interface FeedType {
  feedId: string;
  images: string[];
  content: string;
  createdAt: string;
}
