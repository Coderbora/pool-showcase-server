import { OsuMod } from "@brunohpaiva/osu-parser";

export type Grade = "XH" | "X" | "SH" | "S" | "A" | "B" | "C" | "D";
export type Modpool = "NM" | "HD" | "HR" | "DT" | "FM" | "TB";
export type ShowType = "normal" | "accent";
export interface Map extends Record<string, unknown> {
    id: number,

    title: string,
    artist: string,
    version: string,
    img_url: string,

    diff: {
        cs: number,
        hp: number,
        od: number,
        ar: number,
        sr: number
    },

    length: number,
    bpm: number,

    modpool: Modpool,
    modpool_id: number,

    playedBy: Player | undefined
}

export interface Player {
    username: string,
    rank: Grade,

    count: {
        "300": number,
        "100": number,
        "50": number,
        "0": number
    },

    maxcombo: number,
    accuracy: number,
    score: number,
    modsUsed: OsuMod[],
}

export interface ComponentDetails {
    enabled: boolean,
    top: number,
    left: number,
    mode: ShowType
}

export interface ShowMapDetails {
    listImage: ComponentDetails,

    title: ComponentDetails,
    songName: ComponentDetails,
    version: ComponentDetails,
    
    cs: ComponentDetails,
    ar: ComponentDetails,
    od: ComponentDetails,
    hp: ComponentDetails,
    length: ComponentDetails,
    bpm: ComponentDetails,
    sr: ComponentDetails,

    mapID: ComponentDetails,
}

export interface ShowPlayerDetails {
    playerAvatar: ComponentDetails,

    username: ComponentDetails,
    rank: ComponentDetails,
    
    count300: ComponentDetails,
    count100: ComponentDetails,
    count50: ComponentDetails,
    countMiss: ComponentDetails,

    maxCombo: ComponentDetails,
    accuracy: ComponentDetails,
    score: ComponentDetails,
}

export interface ShowSettings {
    normalColor: string,
    accentColor: string,
    textFont: string,

    map: ShowMapDetails,

    player: ShowPlayerDetails,
}
