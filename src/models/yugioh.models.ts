export interface Dictionary {
    [key: string]: any
}

export interface CardSets {
    set_name: String;
    set_code: String;
    set_rarity: String;
    set_rarity_code: String;
    set_price: String;
}

export interface CardImages {
    id: number;
    image_url: String;
    image_url_small: String;
}

export interface CardPrices {
    [key: string]: any
}

export interface Card {
    id: number;
    name: string;
    type: string;
    desc: string;
    atk?: number;
    def?: number;
    level?: number;
    race: string;
    archetype?: string;
    scale?: number;
    linkval?: number;
    attribute: string;
    card_sets: Array<CardSets>;
    card_images: Array<CardImages>;
    card_prices: Array<CardPrices>;
}

export interface SetInfo {
    set_name: string;
    set_code: string;
    num_of_cards: number;
    tcg_date: string;
}

export interface Filter {
    filter: string;
    value: string;
    spellOrTrap?: string
}