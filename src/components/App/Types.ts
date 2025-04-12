export interface Psychologist {
    about: string,
    avatar_url: string,
    experience: string,
    initial_consultation: string,
    license: string,
    name: string,
    price_per_hour: number,
    rating: number,
    reviews: [{
        comment: string,
        rating: number,
        reviewer: string
    }],
    specialization: string
}