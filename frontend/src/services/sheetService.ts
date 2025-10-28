export type Entry = {
    restaurant: string;
    suggestedBy: string;
}

export async function fetchSheetEntries(sheetId: string): Promise<Entry[]> {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const res = await fetch(url);
    const text = await res.text();

    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows.slice(1);

    const entries = rows.map((row: any) => ({
        restaurant: row.c[0].v || "",
        suggestedBy: row.c[1].v || "",
    }));

    return entries.filter((entry: Entry) => entry.restaurant);
}