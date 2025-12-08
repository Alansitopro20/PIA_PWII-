// src/app/home/models/home.model.ts
export interface CityCard {
  id: string;
  name: string;
  imagenPrincipal?: string;
}

export interface PlaceCard {
  id: string;
  name: string;
  city?: string;
  imagenPrincipal?: string;
}

export interface StayCard {
  id: string;
  name: string;
  city?: string;
  imagenPrincipal?: string;
}

export interface StadiumCard {
  id: string;
  name: string;
  city?: string;
  imagenPrincipal?: string;
}

export interface ReviewCard {
  id: string;
  comentario: string;
  user_name?: string;
  rating?: number;
  item_type: string;
}

export interface HomeData {
  featuredCities?: CityCard[];
  topPlaces?: PlaceCard[];
  topStays?: StayCard[];
  topStadiums?: StadiumCard[];
  recentReviews?: ReviewCard[];
}
