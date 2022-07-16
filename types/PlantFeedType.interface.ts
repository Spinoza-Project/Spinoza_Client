interface CommentType {
  userName: string;
  profileImage: string;
  comment: string;
}

interface Feed {
  feedId: string;
  images: string[];
  content: string;
  comments: CommentType[];
  createdAt: string;
}

export interface PlantFeedType {
  userName?: string;
  plantImage?: string;
  plantName: string;
  farmName: string;
  farmAddress: string;
  weather: string;
  temperature: number;
  humidity: number;
  feeds: Feed[];
}
