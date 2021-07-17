import { OsuMod } from "@brunohpaiva/osu-parser";

export type Grade = "XH" | "X" | "SH" | "S" | "A" | "B" | "C" | "D";
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

    modpool: "NM" | "HD" | "HR" | "DT" | "FM" | "TB",
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